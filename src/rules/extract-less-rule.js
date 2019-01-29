const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const postCssLoader = require('./postcss-rule');
module.exports = {
  test: /\.less$/,
  use: [
    {
        loader: MiniCssExtractPlugin.loader,
        options: {
            publicPath: "../"
        }
    },
    { 
      loader: 'css-loader', 
      options: { 
        importLoaders: 1 
      } 
    }, 
    postCssLoader,
    "less-loader"
  ]
};
