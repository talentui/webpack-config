var {buildProd} = global['talent-ui-runtime'];

module.exports = new (require("webpack").optimize.CommonsChunkPlugin)({
    names: ["common", "webpack-bootstrap"],
    minChunks: Infinity,
    filename: buildProd ? "[name]-[chunkHash].chunk.min.js" : "[name].chunk.js"
});
