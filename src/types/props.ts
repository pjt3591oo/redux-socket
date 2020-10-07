import { socketType } from './socket'

export interface ProviderPropsType {
  store: any
  context?: any
  socket: socketType
  children:  JSX.Element[] | JSX.Element
}

