const { globalObjectKey } = require("../constants");

var { cssModules, buildProd, postCSS } = global[globalObjectKey];

const cssLoader = {
  loader: 'css-loader'
}

if(cssModules) {
  cssLoader.options = {
    modules: true,
    localIdentName: buildProd ? '[hash:base64:5]' : '[path][name]__[local]--[hash:base64:5]',
  }
}

if(postCSS && cssModules){
  cssLoader.options.importLoaders = 1;
}

module.exports = cssLoader;