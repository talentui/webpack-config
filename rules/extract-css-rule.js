const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { extractStylePublicPath: publicPath } = require("../constants.js");
const { buildProd } = global[globalObjectKey];

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
