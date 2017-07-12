const path = require("path");
var { strProd, strDev } = require("../constants.js");
var { devServer, buildProd, useCommonChunk } = global["talent-ui-runtime"];

const plugins = [
    require("./module-concatenation-plugin"),
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

if (useCommonChunk) plugins.push(require("./common-chunk-plugin"));

if (buildProd) {
    plugins.push(require("./uglify-js-plugin"));
}
if (process.env.analyzer_server === "on") {
    plugins.push(require("./bundle-analyzer-plugin"));
}

module.exports = plugins;
