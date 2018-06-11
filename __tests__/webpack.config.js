const path = require("path");
const webpackConfig = require("../src");
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
    it('mode应该等于development', () => {
        expect(config.mode).toBe('development')
    })
});

describe("带参数初始化配置", () => {
    let config = webpackConfig({
        entry: "./entry.js",
        moduleScope: "./src",
        alias: {
            "@": "xxxx",
            _: cwd
        },
        mode: 'production'
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

    it("如果提供applyPlugins测，那么applyPlugins方法应该被调用，并且参数是一个非空数组，同时config.plugins的值应该等于applyPlugins方法的返回值", ()=> {
        let newPlugins = [];
        let spy = jest.fn();
        spy.mockReturnValue(newPlugins);
        let config = webpackConfig({
            applyPlugins: spy
        });
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toBeCalledWith(expect.any(Array));
        expect(config.plugins === newPlugins).toBe(true);
    })

    it("如果提供applyRules参数，那么applyRule方法应该被调用，并且参数是一个非空数组，同时config.modules.rules的值应该等于applyRules方法的返回值", () => {
        let newRules = [];
        let spy = jest.fn();
        spy.mockReturnValue(newRules);
        let config = webpackConfig({
            applyRules: spy
        })
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy).toBeCalledWith(expect.any(Array));
        expect(config.module.rules === newRules).toBe(true);
    })
    it('mode言等于production', () => {
        expect(config.mode).toBe('production')
    })
});
