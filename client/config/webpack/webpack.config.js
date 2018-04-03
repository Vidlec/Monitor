const path = require('path');
const CWD = process.cwd();
const webpack = require('webpack');

const environment = require('../environment');

const config = require('../index');
const webpackVendorConfig = require('./webpack.vendor.config');
const libEntry = Object.keys(webpackVendorConfig.entry)[0];

const mode = environment().type;
const DEVELOPMENT = (mode === 'development');

module.exports = {
    entry: {
      app: [config.entry],
    },
    output: {
      filename: '[name].js',
      path: path.resolve(CWD, config.appPath,)
    },
    cache: true,
    devtool: 'source-map',
    mode,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['env', 'react'],
              plugins: ['syntax-dynamic-import']
            }
          }
        }
      ]
    },
    optimization: {
      occurrenceOrder: true
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: CWD,
        manifest: path.resolve(CWD, `${config.vendorPath}${libEntry}-manifest.json`)
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };