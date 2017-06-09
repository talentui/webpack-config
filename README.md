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
        // 这个是Dll列表，在你的应用中可以通过引入dll的方式引入一些共用的代码
        dllList: [{
            manifest: '@beisen/talent-ui-dll/build/manifest.dev.json',
            file: '@beisen/talent-ui-dll/build/talent-ui-dll.dev.js'
        }]
    })
```

### 关于webpack中对dll的使用请参看[DllPLugin](https://webpack.js.org/plugins/dll-plugin/)

### Dll 列表

* [talent-ui-dll](https://www.npmjs.com/package/@beisen/talent-ui-dll)