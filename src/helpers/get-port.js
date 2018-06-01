const net = require("net");
function checkPort(port) {
    var server = net.createServer();
    try {
        server.listen(port);
        server.close(); //这个是移步的，无法同步获得数据，所以方法暂不可用，需要使用其他的方案
        return port;
    } catch (error) {
        return checkPort(port + 1);
    }
}
