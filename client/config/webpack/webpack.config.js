const path = require('path');
const CWD = process.cwd();
const webpack = require('webpack');

const BabelMinifyPlugin = require('babel-minify-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');

const environment = require('../environment');

const config = require('../index');
const webpackVendorConfig = require('./webpack.vendor.config');
const libEntry = Object.keys(webpackVendorConfig.entry)[0];

const mode = environment().type;
const DEVELOPMENT = (mode === 'development');

module.exports = {
    entry: {
      app: [config.entry]
    },
    output: {
      filename: '[name].js',
      publicPath: config.publicPath,
      path: path.resolve(CWD, config.appPath)
    },
    cache: true,
    mode,
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          include: [
            path.resolve(CWD, config.jsSrc),
          ],
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                cacheDirectory: true,
                presets: ['env', 'react'],
                plugins: ['syntax-dynamic-import']
              }
            },
            {
              loader: 'eslint-loader',
              options: {
                failOnError: !DEVELOPMENT,
                cache: false
              }
            }
          ]
        }
      ]
    },
    optimization: {
      occurrenceOrder: true
    },
    plugins: [
      new webpack.DllReferencePlugin({
        context: CWD,
        manifest: path.resolve(CWD, `${config.vendorPath}/${libEntry}-manifest.json`)
      }),
      new WriteFilePlugin({
        log: false,
        exitOnErrors: !DEVELOPMENT
      }),
      new webpack.HotModuleReplacementPlugin()
    ]
  };