const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    test: /\.less$/,
    use: [
        {
            loader: MiniCssExtractPlugin.loader,
            options: {
                publicPath: "../"
            }
        },
        "css-loader",
        "less-loader"
    ]
};
