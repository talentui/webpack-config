const {
    globalObjectKey,
    languageMixed,
    languageJs,
    languageTs
} = require("../constants.js");
const { devServer, engines, language, useLint } = global[globalObjectKey];

const preTsRule = require("./pre-ts-rule");
const tsRule = require("./ts-rule");
const preJsRule = require("./pre-js-rule");
const jsRule = require("./js-rule");

var rules = [];

switch (language) {
    case languageTs: {
        if (useLint) rules.push(preTsRule);
        rules.push(tsRule);
        break;
    }
    case languageMixed: {
        if (useLint) rules.push(preJsRule, preTsRule);
        rules.push(jsRule, tsRule);
        break;
    }
    case languageJs:
    default: {
        if (useLint) rules.push(preJsRule);
        rules.push(jsRule);
        break;
    }
}

rules.push(require("./file-rule"));

if (devServer) {
    rules.push(require("./css-rule"), require("./sass-rule"));
} else {
    rules.push(require("./extract-css-rule"), require("./extract-sass-rule"));
}

if (engines.indexOf("vue") !== -1) rules.push(require("./vue-rule"));

module.exports = rules;
