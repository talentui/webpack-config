const webpack = require("webpack");
const {buildProd} = global['talent-ui-runtime'];
const {strDev, strProd} = require('../constants.js');

module.exports = new webpack.DefinePlugin({
    "process.env": {
        NODE_ENV: JSON.stringify(buildProd ? strProd : strDev)
    }
});
