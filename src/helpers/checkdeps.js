const path = require("path");
const chalk = require("chalk");
const constants = require('../constants')
const cwd = process.cwd();
const buildDeps = {
    webpack: "webpack",
    webpackCLI: "webpack-cli",
    webpackDevServer: "webpack-dev-server",
    nodeSass: "node-sass",
    sassLoader: "sass-loader"
};
const depStr = "devDependencies";

function keyNotIn(requireDeps, depsConfig) {
    let tempArr = [];
    for (let key in requireDeps) {
        let moduleName = requireDeps[key];
        if (!depsConfig[moduleName]) tempArr.push(moduleName);
    }
    return tempArr;
}

let projPackageJSON = null;
try {
    projPackageJSON = require(path.resolve(cwd, "package.json"));
} catch (err) {
    console.log(
        "没有在您在项目当中发现package.json, 请执行%cnpm init创建一个",
        "color:green"
    );
}

let projDevDeps = projPackageJSON[depStr];

let itemInProjDevDeps = keyNotIn(buildDeps, projDevDeps);
console.log(itemInProjDevDeps)
if (itemInProjDevDeps.length > 0) {
    let joinedItem = itemInProjDevDeps.join(" ");
    console.log(
        `没有你您项目中的`,
        chalk.cyan(depStr),
        "找到",
        chalk.cyan(joinedItem),
        '请使用',
        chalk.cyan(`npm install -D ${joinedItem}`),
        '进行安装, 如果您把以上依赖放到了 ',
        chalk.cyan('dependencies'),
        ' 请放到项目的',
        chalk.cyan(depStr),
        ' 中'
    );
}
if(constants.strTest === process.env.NODE_ENV){
    module.exports = false;
}else{
    module.exports = itemInProjDevDeps.length > 0;
}

