const {
    port,
    host,
    analysis,
    publicPath,
    appRoot,
    buildProd,
    devServer
} = global["talent-ui-runtime"];
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
var messages = [`任务：${devServer ? "开发服务器" : "项目构建"}`];
if(devServer) messages.push(`本地服务地址：http://${host}:${port}`)

module.exports = new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
        messages,
        notes: [
            `运行环境：${buildProd ? "production" : "development"}`,
            `根目录：'${appRoot}'`,
            `图表分析：${analysis ? "启用" : "未启用"}`,
            `publicPath：'${publicPath}'`
        ]
    }
});
