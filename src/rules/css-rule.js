const styleLoader = require('../helpers/get-style-loader')
module.exports = {
    test: /\.css$/,
    use: [styleLoader, "css-loader"]
};
