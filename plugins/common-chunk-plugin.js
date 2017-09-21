const { buildProd } = require("../constants.js");

module.exports = new (require("webpack").optimize.CommonsChunkPlugin)({
    names: ["common", "webpack-bootstrap"],
    minChunks: Infinity,
    filename: buildProd ? "[name]-[chunkHash].chunk.min.js" : "[name].chunk.js"
});
