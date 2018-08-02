const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { globalObjectKey } = require("../constants.js");
const { hostPage } = global[globalObjectKey];

module.exports = new HtmlWebpackPlugin({
    template: hostPage || path.resolve(__dirname, "../index.html"),
    filename: "index.html",
    inject: "body",
    chunksSortMode: function(a,b){
        var order = ['webpack-bootstrap','vendors','common','main'];
        return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
    }
});