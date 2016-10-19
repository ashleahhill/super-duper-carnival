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
      if (!err) {
        reject(err);
      }
      resolve(result);
    });

  })
}

gulp.task('deploy', function (done) {

  const versionArg = process.argv.indexOf('type');

  const versionType = (versionArg > -1)? process.argv[versionArg + 1] : 'patch';

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
