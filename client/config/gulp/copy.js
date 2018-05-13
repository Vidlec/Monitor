const gulp = require('gulp');
const config = require('../index');

gulp.task('copy:html', () => {
  return gulp.src(`${config.TEMPLATE_SRC}/*.html`).pipe(gulp.dest(config.DIST));
});

gulp.task('copy:fonts', () => {
  return gulp
    .src(`${config.FONTS_SRC}/*.woff`)
    .pipe(gulp.dest(config.FONTS_OUTPUT));
});
