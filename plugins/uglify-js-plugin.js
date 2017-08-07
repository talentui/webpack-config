module.exports = new (require("webpack")).optimize.UglifyJsPlugin({
    compress: {
        warnings: false,
        screw_ie8: false
    },
    mangle: { screw_ie8: false },
    output: { screw_ie8: false },
    sourceMap: true
});
