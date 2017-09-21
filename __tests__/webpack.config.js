const path = require('path');
const webpackConfig = require("../webpack.config.js");

describe("用空参数初始化配置", () => {

    let config = webpackConfig();

    it("config是一个对象", () => {
        expect(typeof config).toBe("object");
    });

    it("context需要指向项目根目录", () => {
        expect(config.context).toBe(process.cwd());
    });

    it("entry要指向./index.js", () => {
        expect(config.entry).toBe("./index.js");
    });
    it("alias & 需要指向根目录", () => {
        expect(config.resolve.alias).toEqual({
            "&": process.cwd()
        });
    });
});

describe("带参数初始化配置", () => {
    let rootDir = process.cwd();
    let config = webpackConfig({
        entry: "./entry.js",
        moduleScope: './src',
        alias: {
            "@": "xxxx"
        }
    });

    it("context需要指向根目录下的src", () => {
        expect(config.context).toBe(path.resolve(rootDir, "./src"));
    });

    it("alias得正确的合并", () => {
        expect(config.resolve.alias).toEqual({
            "&": path.resolve(rootDir,'./src'),
            "@": "xxxx"
        })
    })
});
