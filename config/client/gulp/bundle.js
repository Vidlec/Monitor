const gulp = require('gulp');
const gutil = require('gulp-util');
const webpack = require('webpack');

const webpackConfig = require('../webpack/webpack.config.js');
const webpackConfigVendor = require('../webpack/webpack.vendor.config.js');

const bundle = (config, done) => {
  return webpack(config, (fatalError, stats) => {
    const throwError = error => {
      throw new gutil.PluginError('webpack', error);
    };

    /* Fatal error may happen before build is complete */
    fatalError && throwError(fatalError);

    const jsonStats = stats.toJson('errors-only');
    const buildError = jsonStats.errors[0];

    if (buildError) {
      throwError(buildError);
    }

    gutil.log(
      '[webpack]',
      stats.toString({
        colors: true,
        version: false,
        hash: false,
        chunks: false,
        chunkModules: false,
      }),
    );

    done();
  });
};

gulp.task('bundle:client', done => {
  return bundle(webpackConfig, done);
});

gulp.task('bundle:vendor', ['clean:vendor'], done => {
  return bundle(webpackConfigVendor, done);
});
