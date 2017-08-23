const {
    globalObjectKey,
    languageJs,
    languageTs,
    languageMixed
} = require("../constants");
const ts = ".ts";
const tsx = ".tsx";
const js = ".js";
const jsx = ".jsx";
const json = ".json";
const vue = ".vue";
const react = "react";

let { engines, language } = global[globalObjectKey];

let exts = [];

switch (language) {
    case languageTs: {
        exts.push(ts);
        if (engines.indexOf(react) !== -1) exts.push(tsx);
        break;
    }
    case languageMixed: {
        exts.push(js, ts);
        if (engines.indexOf(react) !== -1) exts.push(jsx, tsx);
        break;
    }
    case languageJs:
    default: {
        exts.push(js);
    }
}

if (engines.indexOf("vue") !== -1) exts.push(vue);

exts.push(json);

module.exports = exts;
