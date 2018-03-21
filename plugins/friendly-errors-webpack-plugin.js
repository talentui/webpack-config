const { globalObjectKey, appRoot } = require("../constants.js");
const { port, host, analysis, publicPath, buildProd } = global[globalObjectKey];
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

module.exports = new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
        messages: [`成功启动本地开发服务器`, `地址：http://${host}:${port}`],
        notes: [
            `运行环境：${buildProd ? "production" : "development"}`,
            `根目录：'${appRoot}'`,
            `图表分析：${analysis ? "启用" : "未启用"}`,
            `publicPath：'${publicPath}'`
        ]
    }
});
