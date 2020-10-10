import { Socket } from '..'

export function emitter(path: any) {
  return function (target:any, propertyKey:any, descriptor:any) {
    let originMethod = descriptor.value

    descriptor.value = (...args) => {
      let payload = args.length ? args[0] : {}
      Socket.socket.emit(path, payload)
      return originMethod([Socket.socket, Socket.store, payload])
    }

  }
}

