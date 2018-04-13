const gulp = require('gulp');
const clean = require('gulp-clean');

const config = require('../index');

gulp.task('clean:client', () => {
    return gulp.src(`${config.APP_PATH}*`, { read: false })
        .pipe(clean());
});

gulp.task('clean:css', () => {
  return gulp.src(`${config.CSS_OUTPUT}*`, { read: false })
      .pipe(clean());
});

gulp.task('clean:vendor', () => {
    return gulp.src(`${config.VENDOR_PATH}*`, { read: false })
        .pipe(clean());
});
