const path = require("path");
const webpackConfig = require("../webpack.config.js");
const cwd = process.cwd();

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
            "&": cwd,
            _: cwd
        });
    });
});

describe("带参数初始化配置", () => {
    let config = webpackConfig({
        entry: "./entry.js",
        moduleScope: "./src",
        alias: {
            "@": "xxxx",
            _: cwd
        }
    });

    it("context需要指向根目录下的src", () => {
        expect(config.context).toBe(path.resolve(cwd, "./src"));
    });

    it("alias得正确的合并", () => {
        expect(config.resolve.alias).toEqual({
            "&": path.resolve(cwd, "./src"),
            "@": "xxxx",
            "_": cwd
        });
    });
});
