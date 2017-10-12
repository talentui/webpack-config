const AddAssetHtmlPlugin = require("add-asset-html-webpack-plugin");
const { globalObjectKey } = require("../constants.js");
var { dllParser } = global[globalObjectKey];

module.exports = dllParser.dllList.map(dll => {
    return new AddAssetHtmlPlugin({
        filepath: require.resolve(dll.file),
        includeSourcemap: false
    });
});
