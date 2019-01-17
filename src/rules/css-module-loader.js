const { globalObjectKey } = require("../constants");

var { cssModules, buildProd } = global[globalObjectKey];

const cssLoader = {
  loader: 'css-loader'
}

if(cssModules) {
  cssLoader.options = {
    modules: true,
    localIdentName: buildProd ? '[hash:base64:5]' : '[path][name]__[local]--[hash:base64:5]',
  }
}

module.exports = cssLoader;