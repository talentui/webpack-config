const styleLoader = require('../helpers/get-style-loader');
module.exports = {
    test: /\.scss$/,
    use: [styleLoader, "css-loader", "sass-loader"]
};
