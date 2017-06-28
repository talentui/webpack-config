const {
    targetBrowsers,
    targets: tgt,
    transformInclude,
    transformExclude,
    buildProd
} = global["talent-ui-runtime"];

// 如果没有传递目标浏览器，则配置支持使用chrome > 58版本，减少plugins和polyfills的数量

const userHasDefinedTargets = !!(targetBrowsers || tgt);

targets = tgt || {
    browsers: targetBrowsers || "chrome >= 58"
};

//如果配置了targets， 测不使用内置plugins
const innerPlugins = userHasDefinedTargets
    ? []
    : require("../data/plugins.json");

// 在innerPlugins和用户配置的include中去掉重复的部分。
var includeFeature = require("lodash/uniq.js")([
    ...innerPlugins,
    ...transformInclude
]);

// 如果用户配置了transformExclude与include特性有重复的话，去掉include中的重复的
if (transformExclude.length)
    includeFeature = require("../helpers/array-compete.js")(
        transformExclude,
        includeFeature
    );

module.exports = {
    test: /\.(js)$/,
    exclude: /node_modules\/(?!@beisen\/talent-ui)/, //本正则由张跃同学提供
    loader: "babel-loader",
    options: {
        babelrc: false,
        cacheDirectory: true,
        presets: [
            [
                "env",
                {
                    targets,
                    modules: false,
                    include: includeFeature,
                    exclude: transformExclude,
                    useBuiltIns: true,
                    debug: !buildProd
                }
            ],
            "stage-0",
            "react"
        ],
        plugins: ["syntax-dynamic-import", "transform-decorators-legacy"]
    }
};
