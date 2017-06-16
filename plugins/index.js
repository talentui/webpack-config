const path = require("path");
var { strProd, strDev } = require("../constants.js");
var { devServer, buildProd } = global["talent-ui-runtime"];

const plugins = [
    require("./define-plugin"),
    ...(devServer
        ? [
              require("./hot-module-replacement-plugin"),
              require("./named-modules-plugin"),
              require("./html-webpack-plugin"),
              ...require("./add-asset-html-plugin")
          ]
        : []),
    require("./common-chunk-plugin"),
    require("./extract-text-plugin"),
    ...require("./dll-reference-plugin")
];

if (buildProd) plugins.push(require("./uglify-js-plugin"));

module.exports = plugins;

// const getPlugins = config => {
//     let { isProd, strDev, strProd, devServer } = config;
//     let afterFix = isProd ? "" : "_dev";

//     //开始构建plugins列表
//     let plugins = [

//         // new webpack.DefinePlugin({
//         //     "process.env": {
//         //         NODE_ENV: JSON.stringify(isProd ? strProd : strDev)
//         //     }
//         // }),

//         //当前使用了DevServer
//         ...(devServer
//             ? [
//                 //   new webpack.HotModuleReplacementPlugin(),

//                 //   new webpack.NamedModulesPlugin(),

//                 //   new HtmlWebpackPlugin({
//                 //       template: path.join(__dirname, "../index.html"),
//                 //       filename: "index.html",
//                 //       inject: "body"
//                 //   }),

//                 //   new AddAssetHtmlPlugin({
//                 //       filepath: require.resolve(
//                 //           `@beisen/talent-ui-dll/build/talent_ui_dll${afterFix}.js`
//                 //       ),
//                 //       includeSourcemap: false
//                 //   })
//               ]
//             : []),

//         // new webpack.optimize.CommonsChunkPlugin({
//         //     name: ["common", "webpack-bootstrap"],
//         //     minChunks: 2,
//         //     filename: isProd ? "[name].[hash].js" : "[name].js"
//         // }),

//         // new ExtractTextPlugin({
//         //         filename: isProd ? "css/[name]-[hash].min.css" : "css/[name].css",
//         //         disable: !isProd,
//         //         allChunks: true
//         //     }),

//         // new webpack.DllReferencePlugin({
//         //     manifest: require(`@beisen/talent-ui-dll/build/manifest${afterFix}.json`),
//         //     context: path.resolve(__dirname, "../")
//         // })
//     ];

//     if (isProd) {
//         plugins.push(
//             // new webpack.optimize.UglifyJsPlugin({
//             //     compress: {
//             //         warnings: false
//             //     },
//             //     sourceMap: true,
//             //     minimize: true
//             // })
//         );
//     }
//     return plugins;
// };

// module.exports = getPlugins;
