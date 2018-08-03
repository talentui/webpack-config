const path = require("path");
const chalk = require("chalk");
const constants = require("../constants");
const cwd = process.cwd();
const webpackDeps = {
    webpack: "webpack",
    webpackCLI: "webpack-cli",
    webpackDevServer: "webpack-dev-server"
};

const stylesDeps = {
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

module.exports = function(styles) {
    let buildDeps =
        styles.indexOf("sass") === -1
            ? webpackDeps
            : Object.assign({}, webpackDeps, stylesDeps);

    let projPackageJSON = require(path.resolve(cwd, "package.json"));

    let projDevDeps = projPackageJSON[depStr] || {};

    let itemInProjDevDeps = keyNotIn(buildDeps, projDevDeps);
    if (itemInProjDevDeps.length > 0) {
        let joinedItem = itemInProjDevDeps.join(" ");
        console.log(
            `没有在当前项目的 ${chalk.cyan(depStr)} 找到 ${chalk.cyan(
                joinedItem
            )} 请使用`,
            chalk.cyan(`npm install -D ${joinedItem}`),
            `进行安装, 如果您把以上依赖放到了 ${chalk.cyan(
                "dependencies"
            )} 请放到项目的 ${chalk.cyan(depStr)}  中`
        );
    }
    if (constants.strTest === process.env.NODE_ENV) {
        return false;
    } else {
        return itemInProjDevDeps.length > 0;
    }
};
