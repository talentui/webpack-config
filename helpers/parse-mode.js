let { strDev, strProd } = require("../constants");
module.exports = mode => {
    if (mode) {
        return mode;
    } else {
        let { argv } = process;
        let modeIndex = argv.findIndex(arg => arg.indexOf("--mode") === 0);
        if (modeIndex !== -1) {
            let modeArg = argv[modeIndex];
            if (modeArg.indexOf("=") === -1) {
                mode = argv[modeIndex + 1];
                if (mode.indexOf("-") !== 0) {
                    return mode;
                }
            } else {
                return modeArg.split("=")[1];
            }
        }
        return process.env.NODE_ENV === strProd ? strProd : strDev;
    }
};
