const { projType, globalObjectKey, appRoot } = require("../constants");
var { publicPath, outputUseHash, buildProd, projectType } = global[globalObjectKey];
const path = require("path");
module.exports = (output) => {
    const obj = {
        path: path.resolve(appRoot, "dist/"),
        publicPath: publicPath,
        pathinfo: !buildProd
    };

    if (projectType === projType.module) {
        let packageVersion = require('./get-proj-version')();
        Object.assign(
            obj,
            {
                filename: outputUseHash
                    ? `[name]-${packageVersion}.min.js`
                    : "[name].js",
                chunkFilename: outputUseHash
                    ? `[name]-${packageVersion}.min.js`
                    : "[name].js"
            },
            output
        );
    } else {
        Object.assign(
            obj,
            {
                filename: outputUseHash
                    ? "[name]-[chunkhash].chunk.min.js"
                    : "[name].chunk.js",
                chunkFilename: outputUseHash
                    ? "[name]-[chunkhash].chunk.min.js"
                    : "[name].chunk.js"
            },
            output
        );
    }
    return obj;
};
