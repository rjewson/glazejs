"use strict";
var path = require("path");

module.exports = {
    devtool: "inline-source-map",
    mode: "development",
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
            // {
            //     test: /\.wasm$/,
            //     loaders: ['wasm-loader']
            // }
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    watch:true,
    serve: {
        content: "./dist/",
        port: 8000,
        hot: false,
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
