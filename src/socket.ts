import socketio from "socket.io-client";

class Socket {
  public static store: any;
  public static socket: any;
  host: string;
  
  static listners: any = []
    
  constructor(host: string= "ws://localhost:3000") {
    Socket.store = null
    this.host = host
    this.initSocket()
  }

  initSocket() {
    console.log('initSocket start')
    Socket.socket = socketio.connect(this.host)
    console.log('initSocket end')
  }

  setStore(store: any) {
    console.log('setStore start')
    Socket.store = store
    // console.log(Socket.store)
    Socket.listners.map((listner:any) => {
      listner.target[listner.propertyKey].bind(this)(Socket.socket, Socket.store)
    })
    // this = self
    // console.log(this)
    console.log('setStore end')
  }

  getSocket() {
    return Socket.socket
  }
  
  getStore() {
    return Socket.store
  }

}

export default Socket