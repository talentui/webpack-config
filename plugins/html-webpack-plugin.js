const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = new HtmlWebpackPlugin({
    template: path.resolve(__dirname, "index.html"),
    filename: "index.html",
    inject: "body"
});