import socketio from "socket.io-client";
var Socket = /** @class */ (function () {
    function Socket(host) {
        if (host === void 0) { host = "ws://localhost:3000"; }
        Socket.store = null;
        this.host = host;
        this.initSocket();
    }
    Socket.prototype.initSocket = function () {
        console.log('initSocket start');
        Socket.socket = socketio.connect(this.host);
        console.log('initSocket end');
    };
    Socket.prototype.setStore = function (store) {
        var _this = this;
        console.log('setStore start');
        Socket.store = store;
        // console.log(Socket.store)
        Socket.listners.map(function (listner) {
            listner.target[listner.propertyKey].bind(_this)(Socket.socket, Socket.store);
        });
        // this = self
        // console.log(this)
        console.log('setStore end');
    };
    Socket.prototype.getSocket = function () {
        return Socket.socket;
    };
    Socket.prototype.getStore = function () {
        return Socket.store;
    };
    Socket.listners = [];
    return Socket;
}());
export default Socket;
//# sourceMappingURL=socket.js.map