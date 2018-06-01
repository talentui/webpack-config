const { globalObjectKey, appRoot } = require("../constants.js");
const { dllParser } = global[globalObjectKey];

module.exports = dllParser.getRefPlugin(appRoot)