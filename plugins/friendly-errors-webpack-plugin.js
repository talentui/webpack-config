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
var messages = [`任务：${devServer ? "本地开发服务器" : "项目构建"}`];
if(devServer) messages.push(`本地服务地址：http://${host}:${port}`)

module.exports = new FriendlyErrorsWebpackPlugin({
    compilationSuccessInfo: {
        messages,
        notes: [
            `构建环境：${buildProd ? "生成环境" : "开发环境"}`,
            `应用根目录：${appRoot}`,
            `打包图表分析：${analysis ? "启用" : "未启用"}`,
            `公共路径：${publicPath}`
        ]
    }
});
