const { globalObjectKey } = require("../constants");
const { moduleScope, buildProd } = global[globalObjectKey];

var use = [
    {
        loader: "cache-loader",
        options: {
            cacheIdentifier: `ts-cache-loader-${
                require("../../package.json").version
            }`
        }
    },
    {
        loader: "babel-loader",
        options: require("../helpers/babel-config.js")
    },
    {
        loader: "ts-loader",
        options: {
            transpileOnly: true,
            happyPackMode: buildProd
        }
    }
];

if (buildProd) {
    use.splice(1, 0, {
        loader: "thread-loader"
    });
}

module.exports = {
    test: /\.tsx?$/,
    include: moduleScope,
    use
};
