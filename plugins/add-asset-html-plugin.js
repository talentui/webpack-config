const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const { globalObjectKey } = require("../constants.js");
var { dllList } = global[globalObjectKey];

module.exports = dllList.map(dll => {
    return new AddAssetHtmlPlugin({
        filepath: require.resolve(dll.file),
        includeSourcemap: false
    });
});
