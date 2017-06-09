const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
var { dllList } = global["talent-ui-runtime"];

module.exports = dllList.map(dll => {
    return new AddAssetHtmlPlugin({
        filepath: require.resolve(dll.file),
        includeSourcemap: false
    });
});
