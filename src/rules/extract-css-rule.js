const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssLoader = require('./css-module-loader');
const postcssLoader = require('./postcss-rule');

module.exports = {
  test: /\.css$/,
  use: [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        publicPath: "../"
      }
    },
    cssLoader,
    postcssLoader
  ]
};
