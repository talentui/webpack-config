const {globalObjectKey} = require('../constants')
const { moduleScope } = global[globalObjectKey];

module.exports = {
    test: /\.tsx?$/,
    loader: "ts-loader",
    include: moduleScope
};
