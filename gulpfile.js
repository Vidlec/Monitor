const gulp = require('gulp');
const requireDir = require('require-dir');

requireDir('./config/client/gulp');
requireDir('./config/server/gulp');

gulp.task('client', ['build:client']);
gulp.task('server', ['build:server']);
gulp.task('default', ['build:client', 'build:server']);
