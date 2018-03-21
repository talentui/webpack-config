const ExtractTextPlugin = require("extract-text-webpack-plugin");
const {
    extractStylePublicPath: publicPath,
    globalObjectKey
} = require("../constants.js");
const { buildProd } = global[globalObjectKey];

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
