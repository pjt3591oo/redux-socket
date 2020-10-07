import { Socket } from '..';
export function listener() {
    return function (target, propertyKey, descriptor) {
        Socket.listners.push({ target: target, propertyKey: propertyKey, descriptor: descriptor });
    };
}
//# sourceMappingURL=listener.js.map