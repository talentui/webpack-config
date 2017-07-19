const {
    targetBrowsers,
    targets: tgt,
    transformInclude,
    transformExclude,
    buildProd
} = global["talent-ui-runtime"];

module.exports = {
    test: /\.(js)$/,
    exclude: /node_modules\/(?!@beisen\/talent-ui)/, //本正则由张跃同学提供
    loader: "babel-loader",
    options: Object.assign(
        {
            babelrc: false,
            cacheDirectory: true
        },
        require("../helpers/get-babel-config.js")({
            buildProd,
            targetBrowsers,
            targets: tgt,
            transformInclude,
            transformExclude
        })
    )
};
