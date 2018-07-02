// module.exports = new (require("webpack")).optimize.UglifyJsPlugin({
//     compress: {
//         warnings: false,
//         screw_ie8: false,
//         drop_console: true
//     },
//     mangle: { screw_ie8: false },
//     output: { screw_ie8: false },
//     sourceMap: true
// });
//如果使用6的话一些对象比如{a:a}会被转换成{a}
module.exports = new (require('uglifyjs-webpack-plugin'))({
    uglifyOptions: {
        ie8: true,
        ecma: 5, 
        compress: {
            drop_console: true
        }
    },
    sourceMap: true,
    parallel: true
});
