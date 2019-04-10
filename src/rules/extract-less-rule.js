const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { globalObjectKey } = require('../constants.js');
const { postCSS } = global[globalObjectKey];

const use = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  'css-loader'
];

if (postCSS) {
  use.push(require('./postcss-rule'));
}

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
