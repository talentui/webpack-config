const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
const { styles } = require("./constants");
// 1.0.1
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
 * moduleScope: 默认为'.', 可以通过moduleScope来指明另外的目录，如果想使用根目录，请设置 ".", 如果设置了此scope，所有的相对模板只能从此目录下导入。
 */
module.exports = (options = {}) => {
    // const ASSET_PATH = process.env.asset_path || "";
    //使用全部变量保存配置项，给loaders和plugins使用
    // const checkDeps = require("./helpers/checkdeps")(options.styles || styles);
    // if (checkDeps) process.exit(1);
    const { globalObjectKey, appRoot, typeFunc } = require("./constants.js");

    let {
        port,
        host,
        friendly,
        moduleScope,
        buildProd,
        mode
    } = (global[globalObjectKey] = o = require("./helpers/parse-config")(
        options
    ));

    let { applyPlugins, applyRules } = options;

    let plugins = require("./plugins");
    let rules = require("./rules");

    if (typeof applyPlugins === typeFunc) {
        plugins = applyPlugins(plugins);
    }

    if (typeof applyRules === typeFunc) {
        rules = applyRules(rules);
    }
    return {
        mode,
        context: appRoot,
        entry: o.entry,
        output: require('./helpers/output-name')(options.output),
        //webpack 4的优化配置，
        optimization: require("./helpers/optimization")(),
        module: {
            // 如果忘了export，就报错，而不是只级警告
            strictExportPresence: true,
            rules
        },
        plugins,
        resolve: {
            extensions: require("./helpers/get-resolve-extensions"),
            // modules:  ["node_modules"],
            alias: o.alias,
            plugins: [new ModuleScopePlugin(moduleScope)]
        },
        externals: options.externals,
        devServer: Object.assign(
            {
                port: port,
                host: host,
                hot: true,
                contentBase: path.resolve(appRoot, "dist/"),
                publicPath: "/",
                headers: { "Access-Control-Allow-Origin": "*" },
                quiet: friendly
            },
            options.devServer
        ),
        target: "web",
        node: {
            setImmediate: false,
            dgram: "empty",
            fs: "empty",
            net: "empty",
            tls: "empty",
            child_process: "empty"
        },
        devtool: buildProd ? "cheap-source-map" : false
    };
};
