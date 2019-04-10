const { globalObjectKey } = require('../constants');
const { postCSS } = global[globalObjectKey];
const styleLoader = require('./style-loader');
const use = [styleLoader, 'css-loader'];
if (postCSS) use.push(require('./postcss-rule'));
use.push({
  loader: 'less-loader',
  options: {
    javascriptEnabled: true
  }
});
module.exports = {
  test: /\.less$/,
  use
};
