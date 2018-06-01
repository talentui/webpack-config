const webpack = require("webpack");
const { globalObjectKey, strProd, strDev } = require("../constants.js");
const {buildProd} = global[globalObjectKey];
module.exports = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify(buildProd ? strProd : strDev)
    }
});
