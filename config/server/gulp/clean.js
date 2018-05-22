const gulp = require('gulp');
const clean = require('gulp-clean');

const config = require('../index');

gulp.task('clean:server', () => {
  return gulp.src(`${config.DIST}*`, { read: false }).pipe(clean());
});
