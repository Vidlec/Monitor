const gulp = require('gulp');
const gutil = require('gulp-util');
const requireDir = require('require-dir');

requireDir('./client/config/gulp');
requireDir('./server/config/gulp');

gulp.task('default', ['serve']);

gulp.task('copyHtml', () => {
  return gulp.src('./client/src/templates/*.html')
      .pipe(gulp.dest('./client/dist'))
})
