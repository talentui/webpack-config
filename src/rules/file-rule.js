const { globalObjectKey } = require("../constants");
const { outputUseHash } = global[globalObjectKey];

module.exports = {
    test: /\.(png|jpg|gif|ttf|eot|svg|woff(2)?)(\?[^('|")]*)?$/,
    loader: "file-loader",
    options: {
        name: outputUseHash
            ? "images/[name]-[hash].[ext]"
            : "images/[name].[ext]"
    }
};
