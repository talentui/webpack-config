const { globalObjectKey } = require("../constants");
var { jsWhitelist, buildProd } = global[globalObjectKey];

var use = [
    {
        loader: "cache-loader",
        options: {
            cacheIdentifier: `js-cache-loader-${
                require("../../package.json").version
            }`
        }
    },
    {
        loader: "babel-loader",
        options: require("../helpers/babel-config.js")
    }
];

if (buildProd) {
    use.splice(1, 0, {
        loader: "thread-loader"
    });
}

let jsRule = {
    test: /\.(jsx?)$/,
    use
};

if (jsWhitelist) {
    Object.assign(jsRule, {
        include: jsWhitelist
    });
} else {
    Object.assign(jsRule, {
        exclude: /(node_modules|bower_components)/
    });
}

module.exports = jsRule;
