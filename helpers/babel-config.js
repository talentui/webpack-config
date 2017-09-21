const { globalObjectKey, buildProd } = require("../constants.js");

const {
    targetBrowsers,
    targets,
    transformInclude,
    transformExclude,
    engines
} = global[globalObjectKey];

module.exports = Object.assign(
    {
        babelrc: false,
        cacheDirectory: !buildProd
    },
    require("../helpers/get-babel-config.js")({
        targetBrowsers,
        targets,
        transformInclude,
        transformExclude,
        engines
    })
);
