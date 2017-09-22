const net = require("net");
function checkPort(port) {
    var server = net.createServer();
    try {
        server.listen(port);
        server.close();
        return port;
    } catch (error) {
        return checkPort(port + 1);
    }
}
