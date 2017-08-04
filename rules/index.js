const { devServer, engines } = global["talent-ui-runtime"];

var rules = [
    require("./js-rule"),
    require("./file-rule"),
    ...(devServer
        ? [require("./css-rule"), require("./sass-rule")]
        : [require("./extract-css-rule"), require("./extract-sass-rule")])
];

if(engines.indexOf('vue') !== -1) rules = [require('./vue-rule')].concat(rules);

module.exports = rules;
