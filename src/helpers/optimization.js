var { globalObjectKey } = require("../constants.js");
var { devServer, useCommonChunk } = global[globalObjectKey];
module.exports = () => {
    if (useCommonChunk)
        return {
            runtimeChunk: {
                name: "webpack-bootstrap"
            },
            splitChunks: {
                cacheGroups: {
                    common: {
                        name: "common",
                        chunks: "all",
                        minChunks: 2,
                        minSize: 2000
                    }
                }
            }
        };
};
