const gulp = require('gulp');
const gwatch = require('gulp-watch');
const runSequence = require('run-sequence');

const browserSync = require('browser-sync').create();
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');

const config = require('../index');
const webpackConfig = require('../webpack/webpack.config.js');

const compiler = webpack(webpackConfig);

gulp.task('serve', () => {
  webpackConfig.entry.app.unshift('webpack-hot-middleware/client');
  browserSync.init({
    server: `${config.CLIENT_DIST}`,
    port: config.CLIENT_PORT,
    reloadDelay: 1000,
    middleware: [
      webpackDevMiddleware(compiler, {
        /**
         * Make sure to provide publicPath from the project config, NOT Webpack config.
         * Public path is defined during the runtime, therefore it is not specified in
         * Webpack configuration.
         */
        historyApiFallback: true,
        /* Make sure to set {lazy: false} in order to use aggregate timout */
        lazy: false,
        watchOptions: {
          /* Wait for any other changes before bundling */
          aggregateTimeout: 1500,
        },
        stats: {
          colors: true,
          modules: false,
          chunks: false,
          chunkModules: false,
        },
      }),
      webpackHotMiddleware(compiler),
    ],
    ghostMode: false,
    open: false,
  });

  if (config.DEVELOPMENT) {
    /* Declare watch tasks */
    const watch = (glob, tasks, callback) =>
      gwatch(glob, vinyl => {
        /* When provided custom callback, use it with current vinyl and passed tasks */
        if (callback) {
          return callback(vinyl, tasks);
        }

        /* Otherwise run through runSequence */
        return runSequence(...tasks);
      });
    watch(`${config.TEMPLATE_SRC}/*.html`, ['copy:html', 'reload']);
    watch(`${config.CSS_SRC}`, ['styles:compile', 'reload']);
  }
});

gulp.task('reload', () => browserSync.reload());
