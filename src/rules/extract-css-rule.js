// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssLoader = require('./css-module-loader');
const { globalObjectKey } = require('../constants.js');
const { postCSS } = global[globalObjectKey];

const use = [
  {
    loader: MiniCssExtractPlugin.loader,
    options: {
      publicPath: '../'
    }
  },
  cssLoader
];

if (postCSS) use.push(require('./postcss-rule'));

module.exports = {
  test: /\.css$/,
  use
};
