"use strict";
var path = require("path");

module.exports = {
    entry: "./src/index.ts",
    output: { filename: "./dist/index.js", globalObject: 'this' },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                options: {
                    transpileOnly: true
                }
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    performance: {
        hints: false
    },
    optimization: {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }
};
