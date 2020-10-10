import { Socket } from '..';
export function emitter(path) {
    return function (target, propertyKey, descriptor) {
        var originMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var payload = args.length ? args[0] : {};
            Socket.socket.emit(path, payload);
            return originMethod([Socket.socket, Socket.store, payload]);
        };
    };
}
//# sourceMappingURL=emitter.js.map