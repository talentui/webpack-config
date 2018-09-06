const path = require('path');
const {appRoot } = require("../constants");

module.exports = function() {
    const packageInfo = require(path.resolve(appRoot, "package.json"));
    return  packageInfo.version;
};
