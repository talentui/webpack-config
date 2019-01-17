const styleLoader = require('./style-loader');
module.exports = {
  test: /\.scss$/,
  use: [styleLoader, 'css-loader', 'sass-loader']
};
