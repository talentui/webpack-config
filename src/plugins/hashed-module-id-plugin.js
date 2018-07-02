const webpack = require('webpack');
module.exports = new webpack.HashedModuleIdsPlugin({
    hashDigestLength: 5
})