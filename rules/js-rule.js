module.exports = {
    test: /\.(js)$/,
    exclude: /node_modules/,
    loader: "babel-loader",
    options: {
        babelrc:false,
        cacheDirectory: true,
        presets: [
            [
                "env",
                {
                    target: {
                        browsers: ["ie >= 9"]
                    }
                }
            ],
            "stage-0",
            "react"
        ],
        plugins: ["syntax-dynamic-import", "transform-decorators-legacy"]
    }
};
