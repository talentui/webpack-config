const fs = require('fs');
const Utils = require('./_utils');

const configPath = {
  rc: Utils.getAppFiiePath('.postcssrc.js'),
  conf: Utils.getAppFiiePath('postcss.config.js')
};

const customConfExist =
  fs.existsSync(configPath.rc) || fs.existsSync(configPath.conf);


const config = {};


if (!customConfExist) {
  config.path = Utils.getRelativePath('../../../');
}

module.exports = config;
