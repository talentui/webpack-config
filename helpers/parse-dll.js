const namingConvention = require('@beisen/talent-ui-dll-naming-convention');
const {appRoot, buildProd} = global["talent-ui-runtime"];

module.exports = (dllList=[]) => {
    return dllList.map(dll => {
        if(typeof(dll) === 'object'){
            return dll;
        }else if(typeof(dll) === 'string'){
            let packageName = dll;
            let version = require(`${dll}/package.json`).version;
            let {filename, manifest} = namingConvention(packageName, version, buildProd);
            return {
                file: `${dll}/lib/${filename}`,
                manifest: `${dll}/lib/${manifest}`
            }
        }else{
            console.error('dllList 格式不正确')
        }
    })
}