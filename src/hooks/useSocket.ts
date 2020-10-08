import { useContext } from 'react'
import ReactReduxSocketContext from '../components/Context'

export const useSocket: any = () => useContext(ReactReduxSocketContext)