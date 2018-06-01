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

let useTs = language === languageTs || language === languageMixed;

let useJS = language === languageJs || language === languageMixed;

let supportJSX = engines.indexOf(react) !== -1;

if (useJS) exts.push(js);

if (useTs) exts.push(ts);

if (supportJSX) {
    if (useJS) exts.push(jsx);
    if (useTs) exts.push(tsx);
}

if (engines.indexOf("vue") !== -1) exts.push(vue);

exts.push(json);

module.exports = exts;
