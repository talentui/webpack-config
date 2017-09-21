const webpack = require("webpack");
const { buildProd, strProd, strDev } = require("../constants.js");

module.exports = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify(buildProd ? strProd : strDev)
    }
});
