const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

module.exports = (moduleScope, srcDir) => {
    if (moduleScope) {
        return [new ModuleScopePlugin(srcDir)];
    } else return [];
};
