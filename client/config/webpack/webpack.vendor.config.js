const path = require('path');
const CWD = process.cwd();
const webpack = require('webpack');

const environment = require('../environment');

const config = require('../index');
const packageJson = require('../../../package.json');

const mode = environment().type;

module.exports = {
    entry: {
      // app: ['./client/src/js/index.js'],
      vendor: Object.keys(packageJson.dependencies),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(CWD, config.vendorPath),
      library: '[name]'
    },
    mode,
    optimization: {
      occurrenceOrder: true
    },
    performance: {
      maxAssetSize: 600000
    },
    plugins: [
    new webpack.DllPlugin({
        path: path.resolve(CWD, `${config.vendorPath}[name]-manifest.json`),
        name: '[name]'
    })
   ]
  };