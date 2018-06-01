var ExtractTextPlugin = require('extract-text-webpack-plugin')
const { globalObjectKey  } = require("../constants.js");
const {buildProd} = global[globalObjectKey];
const vueStyleLoader = 'vue-style-loader';


const cssLoader = {
    loader: "css-loader",
    options: {
        minimize: buildProd
    }
};

function generatorLoaders(type, loaderOptions) {
    var loaders = [cssLoader];
    if(type){
        loaders.push({
            loader: `${type}-loader`,
            options: loaderOptions
        })
    }
    if(buildProd){
        return ExtractTextPlugin.extract({
            use: loaders,
            fallback: vueStyleLoader
        })
    }
    return [vueStyleLoader].concat(loaders)
}

module.exports = {
    test: /\.vue$/,
    loader: "vue-loader",
    options: {
        loaders: {
            css: generatorLoaders(),
            sass: generatorLoaders('sass'),
            js: {
                loader: 'babel-loader',
                options: require("../helpers/babel-config.js")
            }
        },
        transformToRequire: {
            video: 'src',
            source: 'src',
            img: 'src',
            image: 'xlink:href'
          }
    }
};
