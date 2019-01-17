const styleLoader = require('./style-loader');
const cssLoader = require('./css-module-loader');
module.exports = {
  test: /\.css$/,
  use: [styleLoader, cssLoader]
};
