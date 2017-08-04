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
 * moduleDirectories: optional 数组 模块查找目录，默认为 node_modules,
 * resoveAlias: 使用Alias来方便一些模块的引入
 * alias
 * transformInclude:
 * transofrmExclude:
 * port
 * host
 * engines: ['react'] default
 */

module.exports = (options = {}) => {
    const appRoot = options.root || path.resolve(__dirname, "../../");
    // const ASSET_PATH = process.env.asset_path || "";
    const srcDir = path.resolve(appRoot, "./src");
    //使用全部变量保存配置项，给loaders和plugins使用
    let projectRuntime = (global["talent-ui-runtime"] = {
        devServer: process.env.dev_server === "on",
        analysis: process.env.analysis === "on",
        friendly: process.env.friendly !== "off",
        publicPath: process.env.asset_path || "",
        buildProd,
        appRoot,
        hostPage: options.hostPage,
        targetBrowsers: options.targetBrowsers,
        targets: options.targets,
        useCommonChunk:
            options.useCommonChunk === undefined
                ? true
                : options.useCommonChunk,
        transformInclude: options.transformInclude || [],
        transformExclude: options.transformExclude || [],
        port: options.port || 3000,
        host: options.host || "127.0.0.1",
        engines: options.engines || ["react"]
    });
    projectRuntime.dllList = require("./helpers/parse-dll")(options.dllList);

    let entry = require("./helpers/parse-entry")(options.entry);

    return {
        context: appRoot,
        entry,
        output: {
            filename: buildProd
                ? "[name]-[chunkhash].chunk.min.js"
                : "[name].chunk.js",
            chunkFilename: buildProd
                ? "[name]-[chunkhash].chunk.min.js"
                : "[name].chunk.js",
            path: path.resolve(appRoot, "dist/"),
            publicPath: projectRuntime.publicPath
        },
        module: {
            rules: require("./rules")
        },
        plugins: require("./plugins"),
        resolve: {
            extensions: require("./helpers/generate-ext.js")(
                projectRuntime.engines
            ),
            modules: options.moduleDirectories || [srcDir, "node_modules"],
            alias: Object.assign(
                {
                    "&": srcDir
                },
                options.alias
            )
        },
        devServer: {
            port: projectRuntime.port,
            host: projectRuntime.host,
            hot: true,
            contentBase: path.resolve(appRoot, "dist/"),
            publicPath: "/",
            headers: { "Access-Control-Allow-Origin": "*" },
            quiet: projectRuntime.friendly
        },
        target: "web",
        devtool: buildProd ? "cheap-source-map" : false
    };
};
