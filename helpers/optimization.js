module.exports = devServer => {
    const cacheGroupCommon = {
        name: "common",
        chunks: "all",
        minChunks: 2,
        minSize: 2000
    };

    var cacheGroups = {
        common: cacheGroupCommon
    };

    //webpack运行时的启动代码，与业务代码无关
    const runtimeChunk = {
        name: "webpack-bootstrap"
    };

    return {
        runtimeChunk,
        splitChunks: {
            cacheGroups
        }
    };
};
