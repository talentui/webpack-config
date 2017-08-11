const extMap = {
    react: [".jsx", ".tsx"],
    vue: ".vue"
};

const baseExt = [".js", ".ts", ".json"];

module.exports = engines => {
    var exts = [...baseExt];
    engines.forEach(item => {
        exts = exts.concat(extMap[item]);
    });
    return exts;
};
