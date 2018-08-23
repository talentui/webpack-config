// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    extractStylePublicPath: publicPath,
    globalObjectKey
} = require("../constants.js");
const { buildProd } = global[globalObjectKey];

module.exports = {
    test: /\.css$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: "../"
            }
        },
        "css-loader"
    ]
};
