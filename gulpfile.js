const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./client/config/gulp');
requireDir('./server/config/gulp');

gulp.task('default', ['serve']);
