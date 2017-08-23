module.exports = {
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loader: "eslint-loader",
    enforce: 'pre',
    options: {
        // eslint options (if necessary)
        parserOptions: {
            "ecmaVersion": 6,
            ecmaFeatures: {
                jsx: true
            }
        },
        env: {
            browser: true,
            worker:true
        }
    }
};
