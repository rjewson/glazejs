const merge = require("webpack-merge");
const common = require("./webpack.config.js");

module.exports = merge(common, {
    watch: true,
    serve: {
        content: "./dist/",
        port: 8000,
        hot: false
    },
    devtool: "inline-source-map",
    mode: "development"
});
