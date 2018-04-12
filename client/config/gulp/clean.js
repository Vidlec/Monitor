const gulp = require('gulp');
const clean = require('gulp-clean');

const config = require('../index');

gulp.task('clean:client', function () {
    return gulp.src(`${config.APP_PATH}*`, { read: false })
        .pipe(clean());
});
  
gulp.task('clean:vendor', function () {
    return gulp.src(`${config.VENDOR_PATH}*`, { read: false })
        .pipe(clean());
});