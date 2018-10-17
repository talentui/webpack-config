
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