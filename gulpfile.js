'use strict';

const gulp = require('gulp');
const githubRelease = require('gulp-github-release-maker');
const runTask = require('./run-tasks');
const git = require('gulp-git');


gulp.task('release:changelog', function (done) {
  githubRelease.showChangelog(done);
});

gulp.task('release:do:patch', function (done) {
  githubRelease.createRelease({ type: 'patch' }, done);
});

gulp.task('release:do:minor', function (done) {
  githubRelease.createRelease({ type: 'minor' }, done);
});

gulp.task('release:do:major', function (done) {
  githubRelease.createRelease({ type: 'major' }, done);
});

/**
 * Wrap gulp-github-release-maker in a promise
 *
 * @param {any} type
 * @returns
 */
function releaseReturnPromise (type) {
  return new Promise((resolve, reject) => {
    githubRelease.createRelease({ type: type }, (err, result)=> {
      if (err) {
        reject(err);
      }
      resolve(result);
    });

  })
}

/**
 * Check if deploying for heroku or firebase
 *
 * @param {any} argv
 * @returns
 */
function getDeployType(argv) {
  let deployType = 'heroku';

 return (argv.indexOf('--firebase') > -1) ? 'firebase' : deployType;
}

/**
 * pull semver to increment from cli option
 *
 * @param {any} argv
 * @returns
 */
function getVersionType (argv) {
  let versionType = 'patch';

  versionType = (argv.indexOf('--major') > -1) ? 'major' : versionType;
  versionType = (argv.indexOf('--minor') > -1) ? 'minor' : versionType;

  return versionType;
}

/**
 * Check if on master
 */
gulp.task('check-master', function (done) {
  git.exec({
    args: 'rev-parse --abbrev-ref HEAD',
    quiet: true
  }, (err, stdout) => {

    if (err) {
      throw err;
    }
    if (stdout.trim() === 'master') {
      done();
      return;
    }
    done(new Error(`You must be on \`master-firebase\` branch to tag and deploy. Currently on branch: ${stdout}.`));
  });
})

/**
 * Build, tag, and publish
 */
gulp.task('deploy', ['check-master'], function (done) {

  const versionType = getVersionType(process.argv);
  const deployType = getDeployType(process.argv);

  runTask('build', {DEBUG: false, NO_HMR: true})
    .then(() => {
      return releaseReturnPromise(versionType);
    })
    .then(() => {
      if (deployType === 'firebase') {
        return runTask('publish-post-tag', {DEBUG: false, NO_HMR: true})
      } else {
        console.log('Finished prep for deployment');
        return true;
      }
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

