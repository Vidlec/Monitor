const path = require('path');
const webpack = require('webpack');
const config = require('../index');
const environment = require('../../../common/config/environment');

const CWD = process.cwd();

module.exports = {
  entry: config.SRC,
  target: 'node',
  mode: environment.TYPE,
  output: {
    path: path.resolve(CWD, config.DIST),
    filename: 'backend.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@services': path.resolve(CWD, `${config.SRC}/services`),
      '@models': path.resolve(CWD, `${config.SRC}/models`),
    },
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(CWD, config.SRC)],
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              plugins: ['syntax-dynamic-import'],
            },
          },
          {
            loader: 'eslint-loader',
            options: {
              failOnError: !config.DEVELOPMENT,
              cache: false,
            },
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
