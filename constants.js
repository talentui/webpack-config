const fs = require('fs');
const strProd = "production";
const strDev = "development";
const strTest = "test";

module.exports = {
    strProd,
    strDev,
    strTest,
    extractStylePublicPath: '../',
    defaultEngines: ["react"],
    globalObjectKey: 'talent-ui-runtime',
    babelExclude: /node_modules\/(?!@beisen\/talent-ui)/, //本正则由张跃同学提供
    languageJs: 'js',
    languageTs: 'ts',
    languageMixed: 'mixed',
    buildProd: process.env.NODE_ENV === strProd,
    appRoot: fs.realpathSync(process.cwd()),
    host: "127.0.0.1",
    port: 3000,
    switchOn: "on",
    switchOff: "off"
};
