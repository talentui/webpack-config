const path = require("path");
var { strProd, strDev, globalObjectKey } = require("../constants.js");
var { devServer, buildProd, useCommonChunk, analysis, friendly } = global[
    globalObjectKey
];

const plugins = [
    // require("./module-concatenation-plugin"),
    require('./case-sensitive-path-plugin'),
    require("./define-plugin"),
    ...require("./dll-reference-plugin"),

    ...(devServer
        ? [
              require("./hot-module-replacement-plugin"),
              //   require("./named-modules-plugin"),
              require("./html-webpack-plugin"),
              ...require("./add-asset-html-plugin")
          ]
        : []),
    require("./extract-text-plugin")
];

if (friendly && devServer) plugins.push(require("./friendly-errors-webpack-plugin"));

if (useCommonChunk) plugins.push(require("./common-chunk-plugin"));

if (buildProd) {
    plugins.push(require("./uglify-js-plugin"));
}
if (analysis) {
    plugins.push(require("./bundle-analyzer-plugin"));
}

module.exports = plugins;
