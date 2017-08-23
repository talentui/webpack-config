const {babelExclude} = require('../constants')

module.exports = {
    test: /\.(jsx?)$/,
    exclude: babelExclude,
    loader: "babel-loader",
    options: require('../helpers/babel-config.js')
};
