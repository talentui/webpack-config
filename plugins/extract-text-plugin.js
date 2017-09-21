const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { buildProd } = require("../constants.js");

module.exports = new ExtractTextPlugin({
    filename: buildProd ? "css/[name]-[hash].min.css" : "css/[name].css",
    disable: !buildProd,
    allChunks: true
});
