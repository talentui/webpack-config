const namingConvention = require("@beisen/talent-ui-dll-naming-convention");
const { buildProd, appRoot } = require("../constants.js");

module.exports = (dllList = []) => {
    return dllList.map(dll => {
        if (typeof dll === "object") {
            return dll;
        } else if (typeof dll === "string") {
            let packageName = dll;
            let version = require(`${dll}/package.json`).version;
            let { filename, manifest } = namingConvention(
                packageName,
                version,
                buildProd
            );
            return {
                file: `${dll}/dist/${filename}`,
                manifest: `${dll}/dist/${manifest}`
            };
        } else {
            console.error("dllList 格式不正确");
        }
    });
};
