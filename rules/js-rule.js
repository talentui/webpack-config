const { targetBrowsers, targets:tgt, transformInclude, transformExclude } = global["talent-ui-runtime"];

targets = tgt || {
        browsers: targetBrowsers
}

module.exports = {
    test: /\.(js)$/,
    exclude: /node_modules/,
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
                    exclude: transformExclude
                }
            ],
            "stage-0",
            "react"
        ],
        plugins: ["syntax-dynamic-import", "transform-decorators-legacy"]
    }
};
