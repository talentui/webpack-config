const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { globalObjectKey } = require("../constants.js");
const { devServer, buildProd } = global[globalObjectKey];

module.exports = new MiniCssExtractPlugin({
    filename: buildProd ? "css/[name]-[hash].min.css" : "css/[name].css"
});
