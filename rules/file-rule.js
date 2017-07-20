module.exports = {
    test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[^('|")]*)?$/,
    loader: "file-loader",
    options: {
        name: "images/[name].[ext]"
    }
};
