"use strict";
var path = require("path");

module.exports = {
    devtool: "inline-source-map",
    entry: "./src/index.ts",
    output: { filename: "./dist/index.js" },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    watch:true,
    devServer: {
        contentBase: "./dist/",
        port: 8000,
    },
};
