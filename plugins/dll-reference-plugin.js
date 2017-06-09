var { buildProd } = global["talent-ui-runtime"];
const path = require("path");
const { appRoot, dllList } = global["talent-ui-runtime"];

module.exports = dllList.map(dll => {
    return new (require("webpack").DllReferencePlugin)({
        manifest: require(dll.manifest),
        context: appRoot
    });
});
