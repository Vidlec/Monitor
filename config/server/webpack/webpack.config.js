const path = require('path');
const webpack = require('webpack');
const config = require('../index');
const environment = require('../../common/environment');

const CWD = process.cwd();

module.exports = {
  entry: { main: config.SRC, graphql: `${config.SRC}/gateways/graphql` },
  target: 'node',
  mode: environment.TYPE,
  output: {
    path: path.resolve(CWD, config.DIST),
    filename: '[name].js',
  },
  devtool: environment.DEVELOPMENT ? 'source-map' : undefined,
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
              plugins: ['syntax-dynamic-import', 'transform-decorators-legacy'],
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
      {
        test: /\.(graphql|gql)$/,
        include: [path.resolve(CWD, config.SRC)],
        exclude: /node_modules/,
        use: [
          {
            loader: 'graphql-tag/loader',
          },
        ],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
};
