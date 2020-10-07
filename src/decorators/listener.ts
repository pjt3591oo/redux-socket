import { Socket } from '..'

export function listener() {
  return (target:any, propertyKey:any, descriptor:any) =>{
    Socket.listners.push({ target, propertyKey, descriptor })
  }
}

