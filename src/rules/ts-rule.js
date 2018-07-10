const {globalObjectKey} = require('../constants')
const { moduleScope, buildProd } = global[globalObjectKey];
const babelConfig = require("../helpers/babel-config.js");

module.exports = {
    test: /\.tsx?$/,
    include: moduleScope,
    loader: "awesome-typescript-loader",
    // loader: "ts-loader",
    options: {
        useBabel: true,
        babelOptions: {
            presets: babelConfig.presets,
            plugins: babelConfig.plugins
        },
        useCache: !buildProd,
    }
};