module.exports = devServer => {
    console.log(1111111111111111111111111111111);
    return {
        runtimeChunk: {
            name: "webpack-bootstrap"
        },
        // splitChunks: {
        //     cacheGroups: {
        //         common: {
        //             name: "common",
        //             chunks: "all",
        //             minChunks: 2,
        //             minSize: 2000
        //         }
        //     }
        // }
    };
};
