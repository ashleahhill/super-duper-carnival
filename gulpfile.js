'use strict';

const gulp = require('gulp');
const githubRelease = require('gulp-github-release-maker');
const runTask = require('./run-tasks');


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

function getVersionType (argv) {
  let versionType = 'patch';

  versionType = (argv.indexOf('--major') > -1) ? 'major' : versionType;
  versionType = (argv.indexOf('--minor') > -1) ? 'minor' : versionType;

  return versionType;
}

gulp.task('deploy', function (done) {

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

})
