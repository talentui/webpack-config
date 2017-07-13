const path = require("path");
var { strProd, strDev } = require("../constants.js");
var { devServer, buildProd, useCommonChunk, analysis, friendly } = global[
    "talent-ui-runtime"
];

const plugins = [
    // require("./module-concatenation-plugin"),
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

if (friendly) plugins.push(require("./friendly-errors-webpack-plugin"));

if (useCommonChunk) plugins.push(require("./common-chunk-plugin"));

if (buildProd) {
    plugins.push(require("./uglify-js-plugin"));
}
if (analysis) {
    plugins.push(require("./bundle-analyzer-plugin"));
}

module.exports = plugins;
