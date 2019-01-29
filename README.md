# Almost 零配置生成构建项目需要的webpack配置，方便快速启动项目。
预置了开发和生产环境当中大部分的内容，安装即用

## 应用

```bash
    yarn add @talentui/webpack-config webpack webpack-cli webpack-dev-server --dev
    //或者
    npm install @talentui/webpack-config webpack webpack-cli webpack-dev-server -D
```

如果你在项目当中要转换sass，需要执行安装
```
    npm install node-sass sass-loader -D
```

如果你打算在项目中转换less文件，需要安装

```
    npm install less-loader -D
```

在你的项目中创建webpack/webpack.config.js
```js
    const path = require('path');

    module.exports = require('@talentui/webpack-config')({
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
            如果是字符串，代表这个dll是基于@talentui/dll-webpack-config打包的dll,这样@talentui/webpack-config可以自动解析路径
            如果是自定义打包的，需要以对象的方式传递manifest和file
        */ 
        'dllList': ['@beisen/talent-ui-dll',{
            manifest: '@beisen/talent-ui-dll/build/manifest.dev.json',
            file: '@beisen/talent-ui-dll/build/talent-ui-dll.dev.js'
        }],
        /*
            公共资源路径，和webpack中的会影响到outpub.publicPath
        */
        "publicPath": "" ,
        // 指定本地开发环境的承载页，默认认为@talentui/webpack-config提供的，提供的挂载点为bsMain
        'hostPage': path.resolve(__dirname, '../index.html')

        // Array<string> | string 浏览器支持列表, 这个会影响你代码打包的速度和文件体积，支持的越新越好
        // replaced by tragetBrwosers: browsers: ["> 1%", "chrome >= 57"], removed from 2017.6.27 replacedBy targetBrowsers, 详情请查看浏览器列表 https://github.com/ai/browserslist
        // 如果不配置以下这两个选项，默认就是chrome > 55
        //Object, 使用targets配置会覆盖targetBrowsers, 当你需要更明确的配置的时候，可以使用此配置项，配置方式请查看文档 https://github.com/babel/babel-preset-env#targets
        'targets': {},
        
        //模块查找目录
        //removed from 2.0 'moduleDirectories': [path.resolve(appRoot, './src'), 'node_modules' ]

        // 设置模块的scope，默认为项目根目录，设置为"./src", 代表设置模块只能在项目根目录下的src目录范围内使用相对路径查找模块
        "moduleScope": "."
        // 设置别名，自己想像能干些什么吧。默认值为{"&": moduleScope} 
        'alias': {
            "_": appRoot, //项目根目录
            "&": moduleScope,
            
        },

        //是否使用commonChunk, 默认为true, 你可以使用这个来禁用commonchunk
        'useCommonChunk': false, //

        //Array<string> 对js进行babel转换时需要包含或者不包含的我，支持 BabelPlugins和env的一些内置方法 你可以看这里 https://github.com/babel/babel-preset-env#include
        'transformInclude': [],
        'engines': ['react' ,'vue'] //可选参数不传默认为['react'], 可以是react或者vue中的一个或者多个。
        // 设置程序使用的语言，支持ts(typescript), js(typescript), mixed(typescript 和 javascript)。这会影响到项目支持的扩展名和使用的loader
        'language': "js",
        // 在构建时是否启用lint检查，默认为false，为true时需要提供相应的.eslintrc和.tslintrc文件
        'useLint': false

        // 扩展plugins的支持方法
        "applyPlugins": (plugins) => {
            let plugin = new OtherPlugin(options);
            return plugins.concat(plugin);
        },
        // rules的扩展方法
        "applyRules": (rules) => {
            let rule = new OtherRule(options);
            return rules.concat(rule)
        },
        projectType: 'spa' || 'mpa' || 'module', //根据项目的类型区别项目构建方式
        //definePlugin的配置
        define: {
            'process.env.NODE_ENV': JSON.stringingfy('production')
        },
        //是否抽离样式文件 默认为true
        extractStyles: true,
        //用来配置babel-plugin-env的Modules参数，转换模块的类型，umd, commonjs, amd， 默认为false， 不转换
        transModule: false,
        //是否启用css模块化，只支持.css文件, 如果想扩展其他，请contrib
        cssModules: false,
        externals: {} //webpack的externals参数
    })
```


## NODE 环境变量设置
@talentui/webpack-config会根据你运行时的变量来决定应用哪些配置，会影响到这些配置的环境变量有。
> `asset_path`: 这个变量会影响到你构建代码时所设置的[publicPath](https://webpack.js.org/configuration/output/#output-publicpath), 因为在生产环境下我们使用了extractTextPlugin来拆分样式代码，所以运行时更改publicPath不太现实，所以我们只能为不同的环境构建不同的结果。

> `dev_server=on` 通过webpack config生成webpack配置对象的时候，很难直接通过环境信息来确定是否启动了dev server, 通过观察process中的数据，发现通过process.mainModule来判断是否是通过webpack-dev-server做为启动模块，普通情况下是可靠的。如果你使用了其他的启动方式，这个时候你需要传递这个环境变量，明确告诉应用启动了webpack-dev-server. 并且加载dev-server模式下需要的配置和插件，如htmlwebpackpulugin和addassethtmlplugin等插件。

> `analysis=on` 如果设置这个的话就会启动webpack bundle analyzer, 提供一个可视化的图表。如图：
<img src="https://raw.githubusercontent.com/imlgm/tupian/master/2017/analyzer.png" style="width:600px" />

> NODE_ENV=production 会启动生产环境的打包

> `friendly=off` 项目默认引入了friendly-error-plugins，因为这样会影响终端的输出，你如果想看到全部的输出，可以设置这个环境变量

> `check=on` 受文件系统的影响，在mac下进行开发，`import './Index.js'` 和 `import './index.js'` 是等价，但在linux文件系统下，却会报错，如果你的项目在linux下运行报错，可以使用这个环境变量打开 `case-sensitive-webpack-plugin`, 这样会对模块的大小写进行检查，如果导入的路径大小写不对，就会报错。为什么不始终打开呢？首先，这样的错误不是频繁出现的，linux下打开也没啥用，其次，减少项目引入的plugins的数量，尽可能的提升打包的速度。


### 关于webpack中对dll的使用请参看[DllPLugin](https://webpack.js.org/plugins/dll-plugin/)

### Dll 列表

* [@talentui/dll-react](https://www.npmjs.com/package/@talentui/dll-react)
* [talent-ui-dll-preact](https://www.npmjs.com/package/@beisen/talent-ui-dll-preact)

### 生成dll的工具：

* [@talentui/dll-webpack-config](https://www.npmjs.com/package/@talentui/dll-webpack-config)

