const { globalObjectKey, babelExclude } = require("../constants.js");
const { buildProd } = global[globalObjectKey];
const babelConfig = require("../helpers/babel-config.js");
module.exports = {
    test: /\.tsx?$/,
    loader: "awesome-typescript-loader",
    exclude: babelExclude,
    options: {
        useBabel: true,
        babelOptions: {
            presets: babelConfig.presets,
            plugins: babelConfig.plugins
        },
        useCache: !buildProd
    }
};
