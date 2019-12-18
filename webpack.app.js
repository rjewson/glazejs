const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.config.js');

module.exports = merge(common, {
  entry: "./src/workerIndex.ts",
  mode: 'production',
  optimization: {
    minimize: true
  },
  plugins: [ 
    new webpack.DefinePlugin({
        __IN_DEBUG__: JSON.stringify(false),
        __IN_WORKER__: JSON.stringify(true),
    }),
  ],
});