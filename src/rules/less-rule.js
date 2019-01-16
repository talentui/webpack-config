const styleLoader = require('../helpers/get-style-loader')
module.exports = {
    test: /\.less$/,
    use: [styleLoader,'css-loader', 'less-loader']
};