module.exports = new (require('webpack').optimize.UglifyJsPlugin)({
    compress: {
        warnings: false
    },
    sourceMap: true,
    minimize: true
});
