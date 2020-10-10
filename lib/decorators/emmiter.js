var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
import { Socket } from '..';
// TODO: 작업중
export function emmiter(path) {
    return function (target, propertyKey, descriptor) {
        // Socket.listners.push({ target, propertyKey, descriptor })
        var originMethod = descriptor.value;
        descriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var payload = args.length ? args[0] : {};
            Socket.socket.emit(path, payload);
            return originMethod.apply(void 0, __spreadArrays([Socket.socket, Socket.store], args));
        };
    };
}
//# sourceMappingURL=emmiter.js.map