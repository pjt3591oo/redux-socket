import React from 'react'
import { socketType } from '../types/socket'

const ReactReduxSocketContext = React.createContext<any>(null)

if (process.env.NODE_ENV !== 'production') {
  ReactReduxSocketContext.displayName = 'ReactRedux'
}

export default ReactReduxSocketContext