const { globalObjectKey } = require("../constants.js");

const {
    targets,
    transformInclude,
    engines,
    buildProd,
    loose,
    transModule: modules
} = global[globalObjectKey];

module.exports = Object.assign(
    {
        babelrc: false,
        cacheDirectory: !buildProd
    },
    require("@talentui/get-babel-config")({
        targets,
        transformInclude,
        engines,
        loose,
        modules
    })
);
