### 4.1.1
* 添加css nodules的支持，添加参加cssModules
* 添加对自定义babel-config的支持，如果项目下有.babelrc或者babel.config.js，就可以覆盖默认配置


### 4.0.4
* 添加extractStyles参数，配置是否抽离样式文件

### 4.0.3
* 添加define参数用来定义definePlugins中的配置
* 添加less loader

### 4.0.0-beta.16
* 添加loose参数，激活所有babel plugins的loose模式

### 4.0.0-beta.16
* 去掉targetBrowsers参数，统一使用targets来设置
* 去掉transformExclude参数
* 添加styles参数，如果没有使用sass测不提醒安装node-sass，这个太费时间
* 添加projectType参数，描述项目类型，是module还是spa 还是mpa

### 2.2.2

* 在构建生产环境执行uglify的时候，把console.xxx给干掉，避免IE在执行到的时候报错。

## 2.0.4

* 使用awesome-typescript-loader代替ts-loader

* 添加tsbase.json, 做了一些基础ts配置，可以在项目中继承



## 2.0.3

* 修复bug, 在非devserver模式下，引入extract plugin

## 2.0.2

### file loader在执行prod打包的时候，给资源文件加hash

## 2.0.1

### 3个bug fix

## webpack-config2.0 

### 参数变化

* 去掉参数root, 考虑到开发者都是在项目下执行打包，所以使用process.pwd()代替用户指定的 root目录
* 去掉moduleDirectories参数，
* 添加moduleScope参数，默认为项目根目录，但常用的是src目录，也可以指定为另外的目录，不允许用户导入moduleScope和node_modules之外的模块
* 添加language参数，可选参数有js, ts和mixed, 这会直接影响到配置使用到的loader，plugins和支持的extensions, 
* 添加check=on环境变量识别，启用此环境变量，会启用路径检查的插件，以防在mac下开发，写错了大小写导致ci构建不成功的问题
* useLint, 默认为true, 会根据你选择的language对不同类型的文件进行语法检查

### 功能变化 
* 添加对typescript的支持， 参数language
* 添加对路径检查的支持, 环境变量check=on
* 使用严格的用moduleScope, 参数moduleScope
* 默认alias & 始终指向配置的 moduleScope
* resolve.modules使用默认值，并且不允许用户配置，因为在前端构建中，不太可能会出现使用项目目录外模块的可能。如果有简化的需求，请使用alias
* 启用strictExportPresence， 如果import没有对应的export就会报错
* 默认根据language启用eslint和tslint


## 更新

### 更新 9月 21号
> dev_server环境变量在正常情况下可以不传，程序会根据process.mainModule来判断是否启动了webpack-dev-server, 如果开发者通过其他方式启动了导致无法识别，可以通过传递此环境变量来明确启动了dev_server

### 8 月 23 

> 添加useLint 参数，默认为false, 使用的话，会启用对应的tslint和eslint

> 默认moduleScope为应用根目录，并且强制不允许引用scope目录之外的相对模块

> 为了提升构建速度，把src目录从模块查找目录排除，并且不允许添加新的模块目录，如果要简化模块查找，请使用alias.

> 添加language参数， 默认为js, 可选ts, 或者mixed. 根据类型的不同选择不同的loader

### 8 22 号

> 添加case sensitivePlugin

> 添加moduleScope参数，默认为src, 会影响到默认的alias, 和模块导入，如果设置了moduleScope, 测不能从指定目录外的目录导入相对模块

> 取消根据engines来修改extensions的方式，感觉多余

> 考虑到我们都是在项目中启动node工具的，所以root参数不再需要了，

> 打开strictExportPresence, 如果导入没有对应的导出，就会报错

> 开发打包打开了output.pathinfo为true

### 8月 11号

> 添加对typescript的打包支持，

> 添加typescript基础配置


### 8月4号

> 添加对vue项目的支持, 

> 添加参数 engines, 用来标识项目对框架的支持，可以是react, vue的一个或者多个

### 7月13号

> 默认短路径使用&代替@, 避免与scope冲突

> dev Server默认启用friendly errors plugin, 使用friendly=off关闭

> analyzer_server改为analysis

### 7月12号
> 重新启用ModuleConcatenationPlugin， 记住一定要设置正确的context

> 更新模块查找目录严格为`path.resolve(appRoot, './src')`和 `path.reslove(appRoot, './node_modules')`, 以防止打包不同版本的同一个库进来。package下的node\_modules不再进行处理。项目管理者需要处理类似这样的依赖问题。

> 设置`path.resolve(appRoot, './src')`的别名为@，当导入./src下的模块时，可以直接使用`import helpers from '@/helpers'`这样的写法

> modules.alias的扩展是会自动进行合并。如果你配置了alias为`alias:{#:'path'}`, 得到的结果是`{@: path.resolve(appRoot, './src'), '#': 'path'}`

> 解决问题：如果设置多个entry的话，必须要在第一个加载的entry的第一个import必须是 `import 'babel-polyfill'`

### 6月29号

> 把`webpack` `webpack-dev-server`放到devDependencies和peerDepencencies中，因为如果放在dependencies中，使用@talentui/webpack-config的包还是需要手动安装webpack和webpack-dev-server,才能在npm scripts中访问到这两个包的可执行文件。

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