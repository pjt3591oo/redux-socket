import { Socket } from '..';
// TODO: 작업중
export function emmiter(path) {
    return function (target, propertyKey, descriptor) {
        // Socket.listners.push({ target, propertyKey, descriptor })
        // console.log(descriptor.arguments)
        // socket.emit(path, "asd")
        // console.log(context)
        // context.socket.emit(path, descriptor.value)
        console.log(Socket);
        Socket.socket.emit(path, descriptor.arguments);
    };
}
//# sourceMappingURL=emmiter.js.map