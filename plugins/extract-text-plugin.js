const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { buildProd } = global["talent-ui-runtime"];

module.exports = new ExtractTextPlugin({
    filename: buildProd ? "css/[name]-[hash].min.css" : "css/[name].css",
    disable: !buildProd,
    allChunks: true
});
