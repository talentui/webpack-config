const styleLoader = require('./style-loader');
const postCssLoader = require('./postcss-rule');
module.exports = {
  test: /\.scss$/,
  use: [
    styleLoader,
    { 
      loader: 'css-loader', 
      options: { 
        importLoaders: 1 
      } 
    }, 
    postCssLoader,
    'sass-loader'
  ]
};
