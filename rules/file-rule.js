const {globalObjectKey} = require('../constants')
const { buildProd } = global[globalObjectKey];

module.exports = {
    test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[^('|")]*)?$/,
    loader: "file-loader",
    options: {
        name: buildProd ? "images/[name]-[hash].[ext]" : "images/[name].[ext]"
    }
};
