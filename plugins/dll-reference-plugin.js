var { buildProd } = global["talent-ui-runtime"];
const path = require("path");
var afterFix = buildProd ? "" : "_dev";
const { appRoot, dllList } = global["talent-ui-runtime"];

module.exports = dllList.map(dll => {
    return new (require("webpack").DllReferencePlugin)({
        manifest: require(`${dll}/build/manifest${afterFix}.json`),
        context: appRoot
    });
});
