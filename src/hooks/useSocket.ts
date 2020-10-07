import { useContext, useMemo } from 'react'
import ReactReduxSocketContext from '../components/Context'



export const useSocket: any = () => {
  console.log("test")
  try {
    return useMemo(() => {
      return useContext(ReactReduxSocketContext)
    }, [ReactReduxSocketContext])
  } catch (err) {
    console.log(err)
  }
}