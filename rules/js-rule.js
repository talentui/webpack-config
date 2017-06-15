const { browsers } = global["talent-ui-runtime"];
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
                    target: {
                        browsers: browsers || "> 1%"
                    },
                    modules: false
                }
            ],
            "stage-0",
            "react"
        ],
        plugins: ["syntax-dynamic-import", "transform-decorators-legacy"]
    }
};
