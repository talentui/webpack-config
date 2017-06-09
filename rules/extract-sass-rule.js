const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
    test: /\.scss$/,
    use: ExtractTextPlugin.extract({
        use: [
            {
                loader: "css-loader",
                options: {
                    minimize: true,
                    sourceMap: true
                }
            },
            "sass-loader"
        ]
    })
};
