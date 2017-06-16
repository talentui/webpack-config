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
        root: path.resolve(__dirname, '../'),  
        //入口文件
        entry: "./src/entry.js", 
        //devserver的端口
        port: 3000, 
        //devServer的host
        host: "127.0.0.1", 
        /*
            dll列表，在你的应用中可以通过引入dll的方式引入一些共用的代码, 
            支持字符串和{file, manifest}格式的对象
            如果是字符串，代表这个dll是基于talent-ui-dll-webpack-config打包的dll,这样talent-ui-webpack-config可以自动解析路径
            如果是自定义打包的，需要以对象的方式传递manifest和file
        */ 
        dllList: ['@beisen/talent-ui-dll',{
            manifest: '@beisen/talent-ui-dll/build/manifest.dev.json',
            file: '@beisen/talent-ui-dll/build/talent-ui-dll.dev.js'
        }],
        // 指定本地开发环境的承载页，默认认为talent-ui-webpack-config提供的，提供的挂载点为bsMain
        hostPage: path.resolve(__dirname, '../index.html')
        // 浏览器支持列表, 这个会影响你代码打包的速度和文件体积，支持的越新越好
        browsers: ["> 1%", "chrome >= 57"],
        //模块查找目录
        moduleDirectories: [path.resolve(__dirname, '../src'), 'node_modules' ]
        // 设置别名，自己想像能干些什么吧。
        alias: {
            "react": 'preact'
        }
    })
```

## NODE 环境变量设置
talent-ui-webpack-config会根据你运行时的变量来决定应用哪些配置，会影响到这些配置的环境变量有。
> ASSET_PATH: 这个变量会影响到你构建代码时所设置的[publicPath](https://webpack.js.org/configuration/output/#output-publicpath), 因为在生产环境下我们使用了extractTextPlugin来拆分样式代码，所以运行时更改publicPath不太现实，所以我们只能为不同的环境构建不同的结果。

> DEV_SERVER=on 如果设置这个的话就会启动webpack dev server, 并且加载htmlwebpackpulugin和addassethtmlplugin等插件。

> NODE_ENV=production 会启动生产环境的打包


### 关于webpack中对dll的使用请参看[DllPLugin](https://webpack.js.org/plugins/dll-plugin/)

### Dll 列表

* [talent-ui-dll](https://www.npmjs.com/package/@beisen/talent-ui-dll)
* [talent-ui-dll-preact](https://www.npmjs.com/package/@beisen/talent-ui-dll-preact)

### 生成dll的工具：

* [talent-ui-dll-webpack-config](https://www.npmjs.com/package/@beisen/talent-ui-dll-webpack-config)