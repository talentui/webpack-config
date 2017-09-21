const path = require("path");
const { globalObjectKey, appRoot } = require("../constants.js");
const { dllList } = global[globalObjectKey];

module.exports = dllList.map(dll => {
    return new (require("webpack").DllReferencePlugin)({
        manifest: require(dll.manifest),
        context: appRoot
    });
});
