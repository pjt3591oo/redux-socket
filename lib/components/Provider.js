import React from 'react';
import ReactReduxSocketContext from './Context';
var Provider = function (_a) {
    var socket = _a.socket, store = _a.store, context = _a.context, children = _a.children;
    // 최초 한번만 수행
    console.log("socket Provider");
    if (socket && !socket.store && store) {
        socket.setStore(store);
        console.log("[BIND] socket-store bind complete");
        return (React.createElement(ReactReduxSocketContext.Provider, { value: socket },
            console.log("Provider"),
            children));
    }
    else {
        return (React.createElement(React.Fragment, null));
    }
};
export default Provider;
//# sourceMappingURL=Provider.js.map