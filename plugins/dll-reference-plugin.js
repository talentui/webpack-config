const path = require("path");
const { globalObjectKey } = require("../constants.js");
const { appRoot, dllList } = global[globalObjectKey];

module.exports = dllList.map(dll => {
    return new (require("webpack").DllReferencePlugin)({
        manifest: require(dll.manifest),
        context: appRoot
    });
});
