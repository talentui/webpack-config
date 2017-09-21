const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { extractStylePublicPath: publicPath, buildProd } = require("../constants.js");

module.exports = {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        use: [
            {
                loader: "css-loader",
                options: {
                    minimize: buildProd,
                    sourceMap: buildProd
                }
            },
            "sass-loader"
        ],
        publicPath
    })
};
