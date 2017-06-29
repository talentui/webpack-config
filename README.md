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

## 关于polyfill和babel-plugins, 

### 有什么不同？ 

> `plugins`会在转换代码的时候检测一些特殊的语法，比如箭头函数，展开运算符，Generator等等, 当碰到这些语法的时候，会被转换成标准的es5兼容的代码，这样我们可以在低版本的浏览器上也能使用这些语言新特性进行开发。 但是也有一些plugins是用来转换语言的新方法的，比如object.assign, 你就可以使用babel-plugin-transform-object-assign这个plugins来转换Object.assign方法的调用，结果是这样的

```js
    //转换前
    Object.assign(a, b);
```

```js
    //转换后
    var _extends = ...;
    _extends(a, b);
```

我从测试的项目截了个图，可以更直观的了解下：
<img src='http://gitlab.beisencorp.com/ux-cnpm/talent-ui-webpack-config/raw/master/assets/object.assign.png' />

注意，在不同的模块中，只要出现Object.assign的地方, 都会定义一个_extends方法， （同模块只定义一次。）这样的话，我们的代码中其实会有很多相同的代码块存在，感觉不太合适。另外一种办法就是polyfill.

> `polyfill`是一种类似补丁的东西，你需要有这个方法，但代码的运行环境可能不支持这个方法，比如Object.assign. 那怎么办，使用plugins会导致上面说的问题。那我们就在所有的代码之前，引入这么段[代码](https://github.com/zloirock/core-js/blob/master/modules/_object-assign.js), 这段代码会在运行时检查当前浏览器是否支持Object.assign, 如果支持，就使用内置的方法，如果不支持，我们就在相同的位置给出方法的定义。这样开发自己写的代码就不需要做任何的转换了。也不会不停的出现相同的定义。看起来是一个不错的方式，但是这种polyfill会污染全局对象。

    以上两种方法使用哪一种，需要开发人员根据自己的情况做出判断，并不是哪一种就一定好于另外一种。

## 我们的选择。

    我们选择使用所有的关于新语法特性的plugins, 但是对于一些新的方法，我们使用polyfill的方式，我们认为这样可以减少代码的体积，并且采用碰到即引入需要的polyfill的方式来按需添加。

在使用Babel进行代码转换的时候，对于新的语法特性我们使用了[这些plugins](https://github.com/babel/babel-preset-env/blob/master/data/plugins.json),
但是对于[新方法]

但是对于polyfill的选择我们一度限入了一种尴尬的情况，对于Talent_UI的项目，我们依然要兼容IE, 我们目前可以根据开发者配置的要支持的浏览器版本来识别，哪些方法是目标浏览器不支持的，然后自动引入对应的polyfill， 但是不管你要兼容IE哪个版本，相当多的polyfill被引入了进来，这些被引入进来的polyfill大部分又是我们开发时用不到的。肿么办？

### 两种办法

* 一种是不管你用没用到，只要你目标浏览器不支持这些polyfill方法，我们都统统引进来
* 一种是我们根据目前的开发情况，选择性的引入一些常用的polyfill, 然后开放给开放人员一个配置项，可以手动选择添加哪些不存在的polyfill

对于项目本身来说其实第二种是比较好的，即能满足我们的需求，又可以减少冗余的代码。

我们在这里列出来了babel-preset-env中内置的所有的[polyfill列表](http://gitlab.beisencorp.com/ux-cnpm/talent-ui-webpack-config/raw/master/data/polyfill.json)，开发者可以参照这个列表来判断应该引入哪些polyfill

### 默认引入的polyfill列表：
* web.timers {"chrome":"58"}
* web.immediate {"chrome":"58"}
* web.dom.iterable {"chrome":"58"}


### 我应该如何设置？
* 如果你的项目中使用了大多数的es6 es7的新特性，**或者压根不打算考虑IE的话**，我们建议你直接配置`targetBrowsers`,指定你要支持的浏览器, 这样的话。让`talent-ui-webpack-config`自动选择使用哪些新特性。这样会比较简单一些。

* 如果你打算支持ie，或者使用的es新特性并不多，我们建议你不去设置`targetBrowsers`或者`targets`, 这样默认会引入[全部的plugins](http://gitlab.beisencorp.com/ux-cnpm/talent-ui-webpack-config/raw/master/data/plugins.json), 和三个默认的polyfill, 剩下的你可以在需要的时候通过`transformInclude`添加, 如果你不打使用全部的plugins, 你可以在`transformExclude`当中把他踢出去。


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

### 6月29号

> 把`webpack` `webpack-dev-server`放到devDependencies和peerDepencencies中，因为如果放在dependencies中，使用talent-ui-webpack-config的包还是需要手动安装webpack和webpack-dev-server,才能在npm scripts中访问到这两个包的可执行文件。

### 6月28号

> 调整babel-loader exclude规则，匹配node\_modules但会忽略 node\_mdoules/@beisen/talent-ui打头的包，这就意味着像@beisen/talent-ui-bootstrap这样的包仍然会通过babel-loader进行转换。目的是为了让import 'babel-polyfill'被babel-preset-env进行处理。将来也可以简化发包的流程

> 更新配置，当不传递targets相关的数据的时候，默认使用`chrome >= 58 `的浏览器支持，但会引入所有的plugins, 

> 当`transformInclude` 和 `transformExclude`都设置了相同的插件或者polyfill的时候，`transformExclude`会生效，include失效。

> 在项目的目录中添加了 `data/plugins.json` 和 `data/polyfill.json` 里面列出了所有的可用的plugins和polyfill, 这些内容是给transformInclude和transformExclude使用的配置项

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