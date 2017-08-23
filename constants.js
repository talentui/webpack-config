module.exports = {
    strProd: "production",
    strDev: "development",
    strTest: "test",
    extractStylePublicPath: '../',
    defaultEngines: ["react"],
    globalObjectKey: 'talent-ui-runtime',
    babelExclude: /node_modules\/(?!@beisen\/talent-ui)/, //本正则由张跃同学提供
    languageJs: 'js',
    languageTs: 'ts',
    languageMixed: 'mixed'
};
