const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
var { buildProd, dllList } = global["talent-ui-runtime"];
var afterFix = buildProd ? "" : "_dev";

module.exports = dllList.map(dll => {
    return new AddAssetHtmlPlugin({
        filepath: require.resolve(
            `${dll}/build/${dll}${afterFix}.js`
        ),
        includeSourcemap: false
    });
});
