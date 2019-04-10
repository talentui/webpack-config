const { globalObjectKey } = require('../constants');
const { postCSS } = global[globalObjectKey];
const styleLoader = require('./style-loader');
const use = [styleLoader, 'css-loader'];
if (postCSS) use.push(require('./postcss-rule'));
use.push('sass-loader');

module.exports = {
  test: /\.scss$/,
  use
};

// const styleLoader = require('./style-loader');
// module.exports = {
//   test: /\.scss$/,
//   use: [styleLoader, 'css-loader', 'sass-loader']
// };