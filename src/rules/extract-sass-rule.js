const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    test: /\.scss$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: "../"
            }
        },
        "css-loader",
        "sass-loader"
    ]
};
