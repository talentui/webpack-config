const { devServer } = global["talent-ui-runtime"];

var rules = [
    require("./js-rule"),
    require("./file-rule"),
    ...(devServer
        ? [require("./css-rule"), require("./sass-rule")]
        : [require("./extract-css-rule"), require("./extract-sass-rule")])
];

module.exports = rules;
