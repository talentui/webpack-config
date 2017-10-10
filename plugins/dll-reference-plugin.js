const path = require("path");
const { globalObjectKey } = require("../constants.js");
const { dllList } = global[globalObjectKey];
const { generateDllReferencePlugins } = require('@beisen/talent-ui-dll-parser-util')

module.exports = generateDllReferencePlugins(dllList);