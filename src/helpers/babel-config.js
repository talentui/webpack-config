const { globalObjectKey } = require('../constants.js');
const fs = require('fs');
const path = require('path');
const cwd = process.cwd();
const {
  targets,
  transformInclude,
  engines,
  buildProd,
  loose,
  transModule: modules
} = global[globalObjectKey];

const configPath = {
  rc: path.resolve(cwd, '.babelrc'),
  conf: path.resolve(cwd, 'babel.config.js')
};

const customConfExist =
  fs.existsSync(configPath.rc) || fs.existsSync(configPath.conf);

const config = {
  cacheDirectory: !buildProd
};

if (!customConfExist) {
  Object.assign(
    config,
    {
      babelrc: false
    },
    require('@talentui/get-babel-config')({
      targets,
      transformInclude,
      engines,
      loose,
      modules
    })
  );
}

module.exports = config;
