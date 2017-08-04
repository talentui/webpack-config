const extMap = {
    react: ".jsx",
    vue: ".vue"
};

const baseExt = [".js", ".json"];

module.exports = engines => {
    return baseExt.concat(
        engines.map(item => {
            return extMap[item];
        })
    );
};
