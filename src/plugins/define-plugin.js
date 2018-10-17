const webpack = require("webpack");
const { globalObjectKey } = require("../constants.js");
const {buildProd, define} = global[globalObjectKey];
module.exports = new webpack.DefinePlugin(define);
