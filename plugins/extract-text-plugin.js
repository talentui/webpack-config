const ExtractTextPlugin = require("extract-text-webpack-plugin");
const { buildProd, globalObjectKey } = require("../constants.js");
const {projectType} = global[globalObjectKey];

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

module.exports = new ExtractTextPlugin({
    filename,
    disable: !buildProd,
    allChunks: true
});
