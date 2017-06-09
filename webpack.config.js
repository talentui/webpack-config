const path = require("path");
const { strProd } = require("./constants.js");
const buildProd = process.env.NODE_ENV === strProd;

module.exports = (options = {}) => {
    const appRoot = options.root || path.resolve(__dirname, "../../");
    //存一些变量信息到全局，作为唯一判断依据
    global["talent-ui-runtime"] = {
        devServer: process.env.DEV_SERVER === "on",
        buildProd,
        appRoot,
        dllList: options.dllList
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
            modules: [path.join(appRoot, "src"), "node_modules"]
        },
        devServer: {
            port: options.port || 3000,
            host: options.host || "127.0.0.1",
            hot: true,
            contentBase: path.resolve(appRoot, "/dist"),
            publicPath: "/"
        },
        target: "web",
        devtool: buildProd ? "cheap-source-map" : false
    };
};
