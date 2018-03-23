const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { globalObjectKey } = require("../constants.js");
const { devServer, buildProd } = global[globalObjectKey];

module.exports = new ExtractTextPlugin({
    filename: buildProd ? "css/[name]-[hash].min.css" : "css/[name].css",
    disable: devServer,
    allChunks: true
});
