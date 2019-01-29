const postCssConfig = require('../helpers/postcss-config');
module.exports = {
  loader: 'postcss-loader',
  options: {
    config: postCssConfig
  },
};
