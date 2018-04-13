const gulp = require('gulp');
const config = require('../index');

gulp.task('copy:html', () => {
    return gulp.src(`${config.TEMPLATE_SRC}/*.html`)
        .pipe(gulp.dest(config.CLIENT_DIST));
});
