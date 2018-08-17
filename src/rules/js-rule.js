const { globalObjectKey } = require("../constants");
var { jsWhitelist } = global[globalObjectKey];

let jsRule = {
    test: /\.(jsx?)$/,
    loader: "babel-loader",
    options: require("../helpers/babel-config.js")
};

if (jsWhitelist) {
    Object.assign(jsRule, {
        include: jsWhitelist
    });
} else {
    Object.assign(jsRule, {
        exclude: function(path) {
            return path.indexOf("/node_modules/") !== -1;
        }
    });
}

module.exports = jsRule;
