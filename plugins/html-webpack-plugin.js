const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { hostPage } = global["talent-ui-runtime"];

module.exports = new HtmlWebpackPlugin({
    template: hostPage || path.resolve(__dirname, "../index.html"),
    filename: "index.html",
    inject: "body",
    chunksSortMode: function(a,b){
        var order = ['webpack-bootstrap','common','main'];
        return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
    }
});