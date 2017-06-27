# Talent UI Webpack Config， 为Talent UI服务的生成Webpack的工具。
在开发和生产环境中的大部分配置已经预置好了。

## 应用

```bash
    yarn add @beisen/talent-ui-webpack-config --dev
    //或者
    npm install @beisen/talent-ui-webpack-config -D
```

在你的项目中创建webpack/webpack.config.js
```js
    const path = require('path');

    module.exports = require('@beisen/talent-ui-webpack-config')({
        //项目目录根节点路径
        'root': path.resolve(__dirname, '../'),  

        //入口文件
        'entry': "./src/entry.js", 

        //devserver的端口
        'port': 3000, 

        //devServer的host
        'host': "127.0.0.1", 

        /*
            dll列表，在你的应用中可以通过引入dll的方式引入一些共用的代码, 
            支持字符串和{file, manifest}格式的对象
            如果是字符串，代表这个dll是基于talent-ui-dll-webpack-config打包的dll,这样talent-ui-webpack-config可以自动解析路径
            如果是自定义打包的，需要以对象的方式传递manifest和file
        */ 
        'dllList': ['@beisen/talent-ui-dll',{
            manifest: '@beisen/talent-ui-dll/build/manifest.dev.json',
            file: '@beisen/talent-ui-dll/build/talent-ui-dll.dev.js'
        }],

        // 指定本地开发环境的承载页，默认认为talent-ui-webpack-config提供的，提供的挂载点为bsMain
        'hostPage': path.resolve(__dirname, '../index.html')

        // Array<string> | string 浏览器支持列表, 这个会影响你代码打包的速度和文件体积，支持的越新越好
        // browsers: ["> 1%", "chrome >= 57"], removed from 2017.6.27 replacedBy targetBrowsers, 详情请查看浏览器列表 https://github.com/ai/browserslist
        // 如果不配置以下这两个选项，默认就是chrome > 55
        'targetBrowsers': "chrome >= 55",
        //Object, 使用targets配置会覆盖targetBrowsers, 当你需要更明确的配置的时候，可以使用此配置项，配置方式请查看文档 https://github.com/babel/babel-preset-env#targets
        'targets': {},
        
        //模块查找目录
        'moduleDirectories': [path.resolve(appRoot, './src'), 'node_modules' ]

        // 设置别名，自己想像能干些什么吧。
        'alias': {
            "react": 'preact'
        },

        //是否使用commonChunk, 默认为true, 你可以使用这个来禁用commonchunk
        'useCommonChunk': false, //

        //Array<string> 对js进行babel转换时需要包含或者不包含的我，支持 BabelPlugins和env的一些内置方法 你可以看这里 https://github.com/babel/babel-preset-env#include
        'transformInclude': [],
        'transformExclude': []
    })
```

## NODE 环境变量设置
talent-ui-webpack-config会根据你运行时的变量来决定应用哪些配置，会影响到这些配置的环境变量有。
> `asset_path`: 这个变量会影响到你构建代码时所设置的[publicPath](https://webpack.js.org/configuration/output/#output-publicpath), 因为在生产环境下我们使用了extractTextPlugin来拆分样式代码，所以运行时更改publicPath不太现实，所以我们只能为不同的环境构建不同的结果。

> `dev_server=on` 如果设置这个的话就会启动webpack dev server, 并且加载htmlwebpackpulugin和addassethtmlplugin等插件。

> `analyzer_server=on` 如果设置这个的话就会启动webpack bundle analyzer, 提供一个可视化的图表。如图：
<img src="https://raw.githubusercontent.com/imlgm/tupian/master/2017/analyzer.png" style="width:600px" />

> NODE_ENV=production 会启动生产环境的打包


### 关于webpack中对dll的使用请参看[DllPLugin](https://webpack.js.org/plugins/dll-plugin/)

### Dll 列表

* [talent-ui-dll](https://www.npmjs.com/package/@beisen/talent-ui-dll)
* [talent-ui-dll-preact](https://www.npmjs.com/package/@beisen/talent-ui-dll-preact)

### 生成dll的工具：

* [talent-ui-dll-webpack-config](https://www.npmjs.com/package/@beisen/talent-ui-dll-webpack-config)

## 更新

### 6月27号

> 移除配置项browsers，替换为targetBrowsers, 如何设置浏览器列表请查看 [浏览器列表](https://github.com/ai/browserslist)

> 添加配置项targets, 这个配置项是你需要对转换的目标做更详细的配置，这个配置项会覆盖targetBrowsers, 详情请看 [官方文档](https://github.com/babel/babel-preset-env#targets)

> 添加配置项支持transformInclude和transformExclude, 使用Babel对js进行转换的时候，我们使用了[babel-preset-env](https://github.com/babel/babel-preset-env), 它可以根据提供的运行环境[Browsers](https://github.com/babel/babel-preset-env#targetsbrowsers)自动选择引入的plugins, 同时可以对一些内置的plugins进行显示指明引入或者不引入，[官方文档](https://github.com/babel/babel-preset-env#include)

### 6月 22号

> 添加配置项useCommonChunk来禁用CommonChunPlugin

> 调整htmlwebpackplugin输出的脚本顺序

> 允许使用common Entry来指定哪些模块应该放到commonChunk中去

### 6月20号
> 升级到 webpack 3.0

> 添加 ModuleConcatenationPlugin 根据文档说，这会极大的提升代码执行时的性能

> 把 ASSET_PATH 的环境变量改成 **asset_path**

> 把 DEV_SERVER 的环境变量改成 **dev_server**

> 添加 analyzer_server=on的配置，启动打包分析服务