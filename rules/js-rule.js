const {
    targetBrowsers,
    targets: tgt,
    transformInclude,
    transformExclude,
    buildProd
} = global["talent-ui-runtime"];

targets = tgt || {
    browsers: targetBrowsers || 'chrome >= 55'
};

module.exports = {
    test: /\.(js)$/,
    exclude: /node_modules\/(?!@beisen\/talent-ui)/, //本正则由张跃同学提供
    loader: "babel-loader",
    options: {
        babelrc: false,
        cacheDirectory: true,
        presets: [
            [
                "env",
                {
                    targets,
                    modules: false,
                    include: transformInclude,
                    exclude: transformExclude,
                    useBuiltIns: true,
                    debug: !buildProd
                }
            ],
            "stage-0",
            "react"
        ],
        plugins: ["syntax-dynamic-import", "transform-decorators-legacy"]
    }
};
