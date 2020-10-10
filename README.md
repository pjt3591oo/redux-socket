# redux-socket

* 설치

```sh
$ npm install --save @mung-office/redux-socket
```

[Sample](https://github.com/pjt3591oo/redux-socket-example) 보러가기

### redux - 리듀서 생성

`store/modules/chat.ts`

```tsx
type ChatState = {
  msg: string,
  senderId: number
}

const initialState:any = []

const ADD = 'CHAT/ADD'
const LAST_REMOVE = 'CHAT/LAST_REMOVE'

export const onAddChat = (payload: ChatState):any => (dispatch: any) => {
  dispatch({
    type: ADD,
    payload
  })
}

export const onLastRemove = (payload: ChatState):any => (dispatch: any) => {
  dispatch({
    type: LAST_REMOVE
  })
}

type ChatAction =
  | ReturnType<typeof onAddChat>
  | ReturnType<typeof onLastRemove>;

export function chat(
  state: any = initialState,
  action: ChatAction
) {
  let msgs =  [...state]
  switch (action.type) {
   
    case ADD:
      msgs.push(action.payload)
      return msgs
    
    case LAST_REMOVE:
      return msgs.slice(0, msgs.length-1)
    
    default: 
      return state
  }

}
```

### redux - 스토어 생성

`store/index.ts`

```tsx
import { combineReducers } from 'redux'
import { createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";

import thunk from "redux-thunk"

import {chat} from './modules/chat';

const rootReducer = combineReducers({
  chat
});

const configureStore = () => {
  // const sagaMiddleware = createSagaMiddleware()

  const store = createStore(
    rootReducer,
    composeWithDevTools(
      applyMiddleware(
        thunk,
        // sagaMiddleware
      )
    )
  )

  // sagaMiddleware.run(rootSaga)

  return store
}

// 루트 리듀서 내보내기
export default configureStore();
```

### redux - 앱에추가

`App.tsx`

```tsx
import React from 'react'

import { Provider as ReduxProvider } from "react-redux"
import store from './store'

import {Provider as ReduxSocketProvider} from '@mung-office/redux-socket'
import socket from './socket'

import ChatComponent from './components/chat'
  

function App() {

  return (
    <div className="App">
      <ReduxProvider store={store}>
        <ChatComponent>
      </ReduxProvider>
    </div>
  );
}

export default App;
```

### 소켓 - 생성

`socket/index.ts`

```tsx
import { Socket, Decorators } from '@mung-office/redux-socket'
import { onAddChat } from '../store/modules/chat'

class S extends Socket {
  constructor(host: string) {
    super(host)
  }

  @Decorators.listener()
  public receive(socket, store) {
    socket.on('/msg', (data) => {
      store.dispatch(onAddChat({
        msg: data.msg.msg,
        senderId: data.senderId
      }))
    })
  }

  @Decorators.emitter("/msg")
  public send(props) {
    let [socket, store, payload] = props
    console.log(payload)
  }

}
let s = new S("ws://localhost:4000")

export default s

```

`@Decorators.listener` 붙은 메서드들 자동으로 호출하여 리스너를 만들어준다.

`@Decorators.emitter('event')` 해당 메서드 호출시 데코레디터를 통해 전달된 이벤트 발생 후 `[socker, store, payload]` 인자를 받는 함수를 호출한다.

### 소켓 - 컨텍스트 생성

`App.tsx`

```tsx
import React from 'react'

import { Provider as ReduxProvider } from "react-redux"
import store from './store'

import {Provider as ReduxSocketProvider} from '@mung-office/redux-socket'
import socket from './socket'

import ChatComponent from './components/chat'
  

function App() {

  return (
    <div className="App">
      <ReduxProvider store={store}>
        <ReduxSocketProvider store={store} socket={socket}>
          <ChatComponent />
        </ReduxSocketProvider>
      </ReduxProvider>
    </div>
  );
}

export default App;
```

### use socket

`components/chat/index.tsx`

```tsx
import React, { useState } from "react"
import { useSelector } from "react-redux"
import  { useSocket }  from "@mung-office/redux-socket"

const ChatComponent = (props) => {
  let data:any = useSelector<any>(state => ({
    msgs: state.chat
  }))
 
  let [msg, setMsg] = useState("")
  let socket: any = useSocket()

  return (
    <>
      <div>
        <input type="text"
          value={msg}
          onChange={e => setMsg(e.target.value)}
        />
        <button
          onClick={() => socket.send(msg)}
        > 
          전송
        </button>
      </div>
      <ul>
        {data.msgs.map((msg, idx) => (
          <li key={idx}>
            <span>(유저){msg.senderId}: </span>
            <span>(메시지){msg.msg}</span>
          </li>
        ))}
      </ul>
    </>
  )
}

export default ChatComponent
```