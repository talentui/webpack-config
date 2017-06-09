const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {appRoot} = global['talent-ui-runtime'];


module.exports = new HtmlWebpackPlugin({
    template: path.resolve(appRoot, "index.html"),
    filename: "index.html",
    inject: "body"
});