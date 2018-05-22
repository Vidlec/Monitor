const gulp = require('gulp');
const svgSprite = require('gulp-svg-sprites');

const config = require('../index');

gulp.task('svg:compile', () => {
  return gulp
    .src(`${config.SVG_SRC}/*.svg`)
    .pipe(
      svgSprite({
        mode: 'defs',
        preview: false,
      }),
    )
    .pipe(gulp.dest(config.GFX_OUTPUT));
});
