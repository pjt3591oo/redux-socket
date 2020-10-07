import React from 'react'
import ReactReduxSocketContext from './Context'
import { ProviderPropsType } from '../types/props'

const Provider = ({socket, store, context,  children}: ProviderPropsType): JSX.Element => {
  
  // 최초 한번만 수행
  console.log("socket Provider")

  if (socket && !socket.store && store) {
    socket.setStore(store)
    console.log("[BIND] socket-store bind complete")
    return (
      <ReactReduxSocketContext.Provider
        value={socket}
      >
        {console.log("Provider")}
        {children}
      </ReactReduxSocketContext.Provider>
    )
  } else {
    return (<></>)
  }

}

export default Provider