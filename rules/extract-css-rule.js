const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { extractStylePublicPath: publicPath, globalObjectKey, buildProd } = require("../constants.js");

module.exports = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        use: {
            loader: "css-loader",
            options: {
                minimize: buildProd,
                sourceMap: buildProd
            }
        },
        publicPath
    })
};
