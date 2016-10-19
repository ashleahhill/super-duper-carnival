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
    done(new Error(`You must be on \`master\` branch to tag and deploy. Currently on branch: ${stdout}.`));
  });
})

/**
 * Build, tag, and publish
 */
gulp.task('deploy', ['check-master'], function (done) {

  const versionType = getVersionType(process.argv);

  runTask('build')
    .then(() => {
      return releaseReturnPromise(versionType);
    })
    .then(() => {
      return runTask('publish-post-tag')
    })
    .then(() => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

