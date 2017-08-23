const webpack = require("webpack");
const { globalObjectKey } = require("../constants.js");
const {buildProd} = global[globalObjectKey];
const {strDev, strProd} = require('../constants.js');

module.exports = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify(buildProd ? strProd : strDev)
    }
});
