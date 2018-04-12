const gulp = require('gulp');
const config = require('../index');

gulp.task('copyHtml', () => {
    return gulp.src(`${config.TEMPLATE_SRC}/*.html`)
        .pipe(gulp.dest(config.CLIENT_DIST))
})