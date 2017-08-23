const fs = require('fs');
const path = require('path');
module.exports = options => {
    const appRoot = fs.realpathSync(process.cwd());
    var config = {
        //是否启用dev_server
        devServer: process.env.dev_server === "on", 
        // 是否启用analysis
        analysis: process.env.analysis === "on", 
        //是否开启友好输出
        friendly: process.env.friendly !== "off", 
        //静态资源路径
        publicPath: process.env.asset_path || "", 
        //是否是构建生产环境
        buildProd: process.env.NODE_ENV === require('../constants').strProd, 
        //应用根目录
        appRoot, 
        //代码目录
        moduleScope: path.resolve(appRoot, options.moduleScope || "."), 
        //自定义承载页
        hostPage: options.hostPage, 
        //是否启用代码检查
        useLint: 
            typeof options.useLint === "undefined" ? true : !!options.useLint, 
        // env的浏览器配置
        targetBrowsers: options.targetBrowsers, 
        //env的目标配置
        targets: options.targets, 
        //是否启用commonChunk
        useCommonChunk:
            options.useCommonChunk === undefined
                ? true
                : options.useCommonChunk, 
        //包含的babel polyfill或者plugin
        transformInclude: options.transformInclude || [], 
        //排除的babel polyfill或者plugin
        transformExclude: options.transformExclude || [], 
        //服务器端口
        port: options.port || 3000, 
        //服务器地址
        host: options.host || "127.0.0.1", 
        //支持的视图库
        engines: options.engines || ["react"], 
        // js ts mixed //使用开发语言，js或者ts，或者混着用
        language: options.language || "js" 
    };
    return config;
};
