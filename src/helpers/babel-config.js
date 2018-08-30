const { globalObjectKey } = require("../constants.js");

const {
    targetBrowsers,
    targets,
    transformInclude,
    engines,
    buildProd
} = global[globalObjectKey];

module.exports = Object.assign(
    {
        babelrc: false,
        cacheDirectory: !buildProd
    },
    require("@talentui/get-babel-config")({
        targetBrowsers,
        targets,
        transformInclude,
        engines
    })
);
