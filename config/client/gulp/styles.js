const gulp = require('gulp');
const gulpif = require('gulp-if');
const stylelint = require('gulp-stylelint');
const flexbugsFixes = require('postcss-flexbugs-fixes');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const sassGlob = require('gulp-sass-glob');
const sourcemaps = require('gulp-sourcemaps');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');

const config = require('../index');
const environment = require('../../common/environment');

/* Lint */
gulp.task('styles:lint', () => {
  return gulp.src(config.CSS_SRC).pipe(
    stylelint({
      failAfterError: false,
      reporters: [
        {
          formatter: 'string',
          console: true,
        },
      ],
    }),
  );
});

/* Compile */
gulp.task('styles:compile', ['styles:lint'], () => {
  const postcssPlugins = [
    flexbugsFixes, // flexbugs must be first because it does not process vendor-prefixed variants
    autoprefixer({ browsers: ['last 2 versions'] }),
  ];

  const postcssDistPlugins = [cssnano({ safe: true })];

  return gulp
    .src(config.CSS_ENTRY)
    .pipe(sassGlob())
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss(postcssPlugins))
    .pipe(gulpif(environment.DEVELOPMENT, sourcemaps.write()))
    .pipe(gulpif(!environment.DEVELOPMENT, postcss(postcssDistPlugins)))
    .pipe(gulp.dest(config.CSS_OUTPUT));
});
