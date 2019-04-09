var { globalObjectKey } = require("../constants.js");
var { devServer, analysis, friendly, buildProd, extractStyles } = global[
    globalObjectKey
];

//使用push推进去的都是返回的单个plugins, 使用concat连接的都是返回的plugins集合

const enableCheck = process.env.check === "on";

var plugins = [require('./progressbar-plugin'), require('./clean-webpack-plugin'), require('./define-plugin')];

//启用路径检查，因为在mac的文件系统下，不区分大小写
if (enableCheck) plugins.push(require("./case-sensitive-path-plugin"));

//引用Dll的Plugin
plugins = plugins.concat(require("./dll-reference-plugin"));

if(buildProd) plugins.push(require('./hashed-module-id-plugin'))

if (devServer) {
    plugins.push(require("./hot-module-replacement-plugin"));
    plugins.push(require("./html-webpack-plugin"));
    plugins = plugins.concat(require("./add-asset-html-plugin"));
}

if (friendly && devServer)
    plugins.push(require("./friendly-errors-webpack-plugin"));

if (extractStyles) {
    plugins.push(require('./mini-css-extract-plugin'));
}

if (analysis) {
    plugins.push(require("./bundle-analyzer-plugin"));
}

module.exports = plugins;
