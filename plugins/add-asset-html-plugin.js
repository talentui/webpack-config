const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
var {buildProd} = global['talent-ui-runtime'];
var afterFix = buildProd ? "" : "_dev";

module.exports = new AddAssetHtmlPlugin({
    filepath: require.resolve(
        `@beisen/talent-ui-dll/build/talent_ui_dll${afterFix}.js`
    ),
    includeSourcemap: false
});
