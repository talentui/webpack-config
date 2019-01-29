const styleLoader = require('./style-loader');
const cssLoader = require('./css-module-loader');
const postCssLoader = require('./postcss-rule');
module.exports = {
  test: /\.css$/,
  use: [styleLoader, cssLoader, postCssLoader]
};
