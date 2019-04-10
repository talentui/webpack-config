const {appRoot} = require('../constants');

module.exports = {
  loader: 'postcss-loader',
  options: {
    config: {
      path: appRoot // 写到目录即可，文件名强制要求是postcss.config.js
    }
  }
};
