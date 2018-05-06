const path = require('path');

const CWD = process.cwd();
const webpack = require('webpack');

const WriteFilePlugin = require('write-file-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const config = require('../index');
const webpackVendorConfig = require('./webpack.vendor.config');

const libEntry = Object.keys(webpackVendorConfig.entry)[0];

const devPlugins = [new webpack.HotModuleReplacementPlugin()];

const commonPlugins = [
  new webpack.DllReferencePlugin({
    context: CWD,
    manifest: path.resolve(
      CWD,
      `${config.VENDOR_PATH}/${libEntry}-manifest.json`,
    ),
  }),
  new webpack.optimize.MinChunkSizePlugin({ minChunkSize: 10000 }),
  new WriteFilePlugin({
    log: false,
    exitOnErrors: !config.DEVELOPMENT,
  }),
];

const plugins = config.DEVELOPMENT
  ? [...commonPlugins, ...devPlugins]
  : commonPlugins;

module.exports = {
  entry: {
    app: [config.CLIENT_ENTRY],
  },
  output: {
    filename: '[name].js',
    chunkFilename: 'chunks/[name].js',
    hotUpdateChunkFilename: 'hot-updates/[id].[hash].hot-update.js',
    publicPath: config.PUBLIC_PATH,
    path: path.resolve(CWD, config.APP_PATH),
  },
  cache: true,
  mode: config.ENVIRONMENT,
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@const': path.resolve(CWD, `${config.JS_SRC}/const`),
      '@components': path.resolve(CWD, `${config.JS_SRC}/components`),
      '@store': path.resolve(CWD, `${config.JS_SRC}/store`),
      '@reducers': path.resolve(CWD, `${config.JS_SRC}/store/reducers`),
      '@utils': path.resolve(CWD, `${config.JS_SRC}/utils`),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [path.resolve(CWD, config.JS_SRC)],
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
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    occurrenceOrder: true,
    namedChunks: true,
  },
  plugins,
};
