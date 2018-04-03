const gulp = require('gulp');
const clean = require('gulp-clean');

const config = require('../index');

gulp.task('clean:client', function () {
    return gulp.src(`${config.appPath}*`, { read: false })
        .pipe(clean());
});
  
gulp.task('clean:vendor', function () {
    return gulp.src(`${config.vendorPath}*`, { read: false })
        .pipe(clean());
});