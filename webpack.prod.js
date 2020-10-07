const webpack = require("webpack");
const merge = require('webpack-merge');
const common = require('./webpack.config.js');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode: 'production',
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: true
        }
      })
    ]
  },
  plugins: [ 
    new webpack.DefinePlugin({
        __IN_DEBUG__: JSON.stringify(false),
        __IN_WORKER__: JSON.stringify(false),
      }),
  ],
});