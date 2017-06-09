module.exports = {
    test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[^('|")]*)?$/,
    loader: "file-loader?name=images/[name].[ext]",
    options: {
        name: "image/[name].[ext]"
    }
};
