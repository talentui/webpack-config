const {
    targetBrowsers,
    targets,
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
            cacheDirectory: !buildProd
        },
        require("../helpers/get-babel-config.js")({
            targetBrowsers,
            targets,
            transformInclude,
            transformExclude
        })
    )
};
