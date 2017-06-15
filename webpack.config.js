const path = require("path");
const { strProd } = require("./constants.js");
const buildProd = process.env.NODE_ENV === strProd;

/**
 * @options
 * root： optional 项目的根目录 默认为当前文件所有路径的上上级，最好还是传进来
 * entry: Required Webpack入口模块
 * dllList: optional dll列表 默认为空数组
 * hostPage: optional 本地承载页，需要是一个绝对路径, 默认的挂载点为#bsMain
 * browsers: optional 浏览器支持 默认为 > 1% 详情请看 https://github.com/ai/browserslist,
 * modulesDirectory: optional 数组 模块查找目录，默认为 node_modules,
 * resoveAlias: 使用Alias来方便一些模块的引入
 */

module.exports = (options = {}) => {
    const appRoot = options.root || path.resolve(__dirname, "../../");
    //使用全部变量保存配置项，给loaders和plugins使用
    global["talent-ui-runtime"] = {
        devServer: process.env.DEV_SERVER === "on",
        buildProd,
        appRoot,
        dllList: options.dllList || [],
        hostPage: options.hostPage,
        broswers: options.broswers
    };

    return {
        context: appRoot,
        entry: {
            main: options.entry || "./src/entry.js"
        },
        output: {
            filename: buildProd
                ? "[name]-[chunkhash].bundle.min.js"
                : "[name].chunk.js",
            chunkFilename: buildProd
                ? "[name]-[chunkhash].chunk.min.js"
                : "[name].chunk.js",
            path: path.resolve(appRoot, "dist/"),
            publicPath: buildProd ? "/dist/" : "/"
        },
        module: {
            rules: require("./rules")
        },
        plugins: require("./plugins"),
        resolve: {
            modules: options.modulesDirectory || ["node_modules"],
            alias: options.alias || {}
        },
        devServer: {
            port: options.port || 3000,
            host: options.host || "127.0.0.1",
            hot: true,
            contentBase: path.resolve(appRoot, "dist/"),
            publicPath: "/"
        },
        target: "web",
        devtool: buildProd ? "cheap-source-map" : 'eval'
    };
};
