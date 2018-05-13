const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./client/config/gulp');
requireDir('./server/config/gulp');

gulp.task('client', ['build:client']);
gulp.task('server', ['build:server']);
gulp.task('default', ['build:client', 'build:server']);
