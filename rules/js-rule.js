module.exports = {
    test: /\.(jsx?)$/,
    exclude: function(path) {
        if (path.indexOf("node_modules/webpack-dev-server/client") !== -1 || path.indexOf("/node_modules/@beisen/talent-ui") !== -1) {
            return false;
        }

        return path.indexOf("/node_modules/") !== -1;
    },
    loader: "babel-loader",
    options: require("../helpers/babel-config.js")
};
