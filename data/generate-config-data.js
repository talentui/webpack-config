const fs = require("fs");
const path = require("path");
const newline = "\n";

const generateData = function(source, target) {
    const builtinPluginsData = require(source);
    var builtinPluginsConfig = JSON.stringify(Object.keys(builtinPluginsData));
    builtinPluginsConfig = builtinPluginsConfig
        .replace(/,/g, "," + newline)
        .replace(/\[/g, "[" + newline)
        .replace(/\]/g, newline + "]");

    var pluginFile = fs.createWriteStream(
        path.resolve(__dirname, target),
        {
            autoClose: true
        }
    );
    pluginFile.write(builtinPluginsConfig);
    pluginFile.close();
};

generateData("babel-preset-env/data/plugins.json", 'plugins.json');
generateData("babel-preset-env/data/built-ins.json", 'polyfill.json')