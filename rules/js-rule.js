module.exports = {
    test: /\.(js)$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    options: {
        cacheDirectory: true
    }
};
