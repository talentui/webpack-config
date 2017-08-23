const {globalObjectKey} = require('../constants')
const { moduleScope } = global[globalObjectKey];

module.exports = {
    test: /\.(ts|tsx)$/,
    loader: require.resolve('tslint-loader'),
    enforce: 'pre',
    include: moduleScope
  }