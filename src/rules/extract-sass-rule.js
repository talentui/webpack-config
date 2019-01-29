const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postCssLoader = require('./postcss-rule');
module.exports = {
    test: /\.scss$/,
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath: '../'
        }
      },
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
