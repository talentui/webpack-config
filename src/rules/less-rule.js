const styleLoader = require('./style-loader');
module.exports = {
  test: /\.less$/,
  use: [styleLoader, 'css-loader', 'less-loader']
};
