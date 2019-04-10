const { globalObjectKey } = require('../constants');
const { postCSS } = global[globalObjectKey];
const styleLoader = require('./style-loader');
const cssLoader = require('./css-module-loader');

const use = [styleLoader, cssLoader];
if (postCSS) use.push(require('./postcss-rule'));
module.exports = {
  test: /\.css$/,
  use
};



// const styleLoader = require('./style-loader');
// const cssLoader = require('./css-module-loader');
// module.exports = {
//   test: /\.css$/,
//   use: [styleLoader, cssLoader]
// };
