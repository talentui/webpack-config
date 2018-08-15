const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { globalObjectKey, projType } = require("../constants.js");
const { buildProd, projectType } = global[globalObjectKey];

let name = '';
let nameProd = '';
let packageVersion = require('../helpers/get-proj-version')();

if(projectType === projType.module){
    name='[name].css';
    nameProd = `[name]-${packageVersion}.min.css`;
}else {
    name = "css/[name].css";
    nameProd = "css/[name]-[hash].min.css";
}


module.exports = new MiniCssExtractPlugin({
    filename: buildProd ? nameProd : name
});
