module.exports = {
    test: /\.scss$/,
    exclude: /node_modules/,
    use: ["style-loader", "css-loader", "sass-loader"]
};
