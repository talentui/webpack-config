const fs = require("fs");
const path = require("path");
const {
    appRoot,
    languageJs,
    port,
    host,
    defaultEngines,
    switchOn,
    switchOff,
    strProd,
    projType
} = require("../constants");
const DllParser = require('@talentui/dll-parser')
module.exports = options => {
    let { entry } = options;
    if (!entry) {
        console.warn("你没有提供应用的入口文件，默认指向[moduleScope]下的index.js文件");
        entry = "./index.js";
    }
    let mode = require('./parse-mode')(options.mode);

    let buildProd = mode === strProd;

    let moduleScope = path.resolve(appRoot, options.moduleScope || ".");

    //从环境变量中取配置
    let { analysis, friendly, asset_path, dev_server } = process.env;

    if(!dev_server){
        // 尝试通过启动模块来判断是不是使用了webpack-dev-server
        const {mainModule={}} = process;
        const reg = /webpack-dev-server\.js/
        if(reg.test(mainModule.filename)){
            dev_server = switchOn
        }
    }

    let devServer = dev_server === switchOn;

    // 只在生产环境构建且不启动devServer的时候输出文件名字启用hash
    let outputUseHash = !devServer && buildProd;

    var config = {
        //webpack 4新增的mode参数
        mode,
        //是否是生产环境构建
        buildProd,
        // 是否启用analysis
        analysis: analysis === switchOn,
        //是否开启友好输出
        friendly: friendly !== switchOff,
        //静态资源路径
        publicPath: asset_path || options.publicPath || "",
        //是否启用dev_server
        devServer,

        outputUseHash,
        // 入口文件
        entry,
        // dll 列表，数组 || undefined
        dllParser: new DllParser(options.dllList, buildProd),
        //代码目录
        moduleScope,
        //别名：
        alias: Object.assign(
            {
                "_": appRoot,
                "&": moduleScope,
            },
            options.alias
        ),
        //自定义承载页
        hostPage: options.hostPage,
        //是否启用代码检查
        useLint: options.useLint === undefined ? false : !!options.useLint,
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
        port: options.port || port,
        //服务器地址
        host: options.host || host,
        //支持的视图库
        engines: options.engines || defaultEngines,
        // js ts mixed //使用开发语言，js或者ts，或者混着用
        language: options.language || languageJs,
        projectType: options.projectType || projType.spa,
        jsWhitelist: options.jsWhitelist
    };
    return config;
};
