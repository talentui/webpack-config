const path = require("path");
var { strProd, strDev, globalObjectKey, buildProd } = require("../constants.js");
var { devServer, useCommonChunk, analysis, friendly } = global[
    globalObjectKey
];

const enableCheck = process.env.check === "on";

var plugins = [require("./dll-reference-plugin"), require("./define-plugin")];

//启用路径检查，因为在mac的文件系统下，不区分大小写


if (buildProd) {
    plugins.push(require('./module-concatenation-plugin'), require("./extract-text-plugin"), require("./uglify-js-plugin"));
}

if (devServer) {
    plugins.push(
        require("./hot-module-replacement-plugin"),
        require("./html-webpack-plugin"),
        require("./add-asset-html-plugin")
    );
}

if (useCommonChunk) plugins.push(require("./common-chunk-plugin"));

if (friendly && devServer)
    plugins.push(require("./friendly-errors-webpack-plugin"));

if (enableCheck) plugins.push(require("./case-sensitive-path-plugin"));

if (analysis) {
    plugins.push(require("./bundle-analyzer-plugin"));
}

module.exports = plugins;
