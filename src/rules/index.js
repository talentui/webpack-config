const {
    globalObjectKey,
    languageMixed,
    languageJs,
    languageTs
} = require("../constants.js");
const { language, useLint, extractStyles } = global[globalObjectKey];

const preTsRule = require("./pre-ts-rule");
const preJsRule = require("./pre-js-rule");
const jsRule = require("./js-rule");

var rules = [jsRule];

switch (language) {
    case languageTs: {
        if (useLint) rules.push(preTsRule);
        break;
    }
    case languageMixed: {
        if (useLint) rules.push(preJsRule, preTsRule);
        break;
    }
    case languageJs:
    default: {
        if (useLint) rules.push(preJsRule);
        break;
    }
}

rules.push(require("./file-rule"));

if (extractStyles) {
    rules.push(require("./extract-css-rule"), require("./extract-sass-rule"), require('./extract-less-rule'));
} else {
    rules.push(require("./css-rule"), require("./sass-rule"), require('./less-rule'));
}

module.exports = rules;
