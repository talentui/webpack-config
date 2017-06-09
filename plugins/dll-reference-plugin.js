var {buildProd} = global['talent-ui-runtime'];
const path = require('path');
var afterFix = buildProd ? "" : "_dev";
const {appRoot} = global['talent-ui-runtime'];

module.exports = new (require('webpack').DllReferencePlugin)({
    manifest: require(`@beisen/talent-ui-dll/build/manifest${afterFix}.json`),
    context: appRoot
});
