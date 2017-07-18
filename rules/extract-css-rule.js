const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
        publicPath: '../'
    })
};
