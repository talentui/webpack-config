const { globalObjectKey } = require("../constants.js");
const {buildProd} = global[globalObjectKey]
module.exports = {
    test: /\.tsx?$/,
    loader: 'awesome-typescript-loader',
    options: {
        useBabel: true,
        babelOptions:require('../helpers/babel-config.js'),
        useCache: !buildProd
    }
}