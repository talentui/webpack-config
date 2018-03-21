const path = require("path");
var { strProd, strDev, globalObjectKey } = require("../constants.js");
var { devServer, useCommonChunk, analysis, friendly, buildProd } = global[
    globalObjectKey
];

//使用push推进去的都是返回的单个plugins, 使用concat连接的都是返回的plugins集合

const enableCheck = process.env.check === "on";

var plugins = [];

//启用路径检查，因为在mac的文件系统下，不区分大小写
if (enableCheck) plugins.push(require("./case-sensitive-path-plugin"));

// if (buildProd) plugins.push(require('./module-concatenation-plugin'));

plugins.push(require("./define-plugin"));

plugins = plugins.concat(require("./dll-reference-plugin"));

if (devServer) {
    plugins.push(
        require("./hot-module-replacement-plugin"),
        require("./html-webpack-plugin")
    );
    plugins = plugins.concat(require("./add-asset-html-plugin"));
}

if (friendly && devServer)
    plugins.push(require("./friendly-errors-webpack-plugin"));

// if (useCommonChunk) plugins.push(require("./common-chunk-plugin"));

if (buildProd) {
    plugins.push(require("./extract-text-plugin"));
    plugins.push(
        require("./uglify-js-plugin")
    );
}

if (analysis) {
    plugins.push(require("./bundle-analyzer-plugin"));
}

module.exports = plugins;