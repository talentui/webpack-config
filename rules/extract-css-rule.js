const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { extractStylePublicPath: publicPath } = require("../constants.js");

module.exports = {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
        use: {
            loader: "css-loader",
            options: {
                minimize: true,
                sourceMap: true
            }
        },
        publicPath
    })
};
