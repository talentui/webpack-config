const { globalObjectKey } = require("../constants");

var { cssModules, buildProd } = global[globalObjectKey];

let cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
  }
}

if (cssModules) {
  cssLoader.options = Object.assign({}, cssLoader.options, {
    modules: true,
    localIdentName: buildProd ? '[hash:base64:5]' : '[path][name]__[local]--[hash:base64:5]',
  });
}

module.exports = cssLoader;