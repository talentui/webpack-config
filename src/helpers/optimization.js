var { globalObjectKey, projType } = require("../constants.js");
var { useCommonChunk, projectType } = global[globalObjectKey];

module.exports = function() {
    let minimizer = [
        require("../plugins/uglify-js-plugin"),
        require("../plugins/optimize-css-asset-plugin")
    ];

    if (!useCommonChunk || projectType === projType.module)
        return {
            runtimeChunk: false,
            splitChunks: false,
            minimizer
        };

    let runtimeChunk = {
        name: "webpack-bootstrap"
    };

    let cacheGroups = {
        vendors: {
            chunks: "initial",
            name: "vendors",
            minChunks: 1,
            test: /[\\/]node_modules[\\/]/,
            priority: 10
        },
        default: false
    };

    if (projectType === projType.spa) {
        cacheGroups = Object.assign({}, cacheGroups, {
            common: {
                name: "common",
                minChunks: 2,
                priority: 1
            }
        });
    }

    let splitChunks = {
        minSize: 3000,
        minChunks: 2,
        maxAsyncRequests: 5,
        maxInitialRequests: 5,
        automaticNameDelimiter: "-",
        name: true,
        cacheGroups
    };

    return {
        runtimeChunk,
        splitChunks,
        minimizer
    };
};
