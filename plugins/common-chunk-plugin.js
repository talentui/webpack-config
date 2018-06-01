const { buildProd, globalObjectKey } = require("../constants.js");
const { outputUseHash } = global[globalObjectKey];

module.exports = new (require("webpack")).optimize.CommonsChunkPlugin({
    names: ["common", "webpack-bootstrap"],
    minChunks: Infinity,
    filename: outputUseHash ? "[name]-[chunkhash].chunk.min.js" : "[name].chunk.js"
});
