const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {
    extractStylePublicPath: publicPath,
    globalObjectKey
} = require("../constants.js");
const { buildProd } = global[globalObjectKey];

module.exports = {
    test: /\.scss$/,
    use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
    ]
    // use: ExtractTextPlugin.extract({
    //     use: [
    //         {
    //             loader: "css-loader",
    //             options: {
    //                 minimize: buildProd,
    //                 sourceMap: buildProd
    //             }
    //         },
    //         "sass-loader"
    //     ],
    //     publicPath
    // })
};
