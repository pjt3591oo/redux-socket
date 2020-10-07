import { useContext, useMemo } from 'react';
import ReactReduxSocketContext from '../components/Context';
export var useSocket = function () {
    console.log("test");
    try {
        return useMemo(function () {
            return useContext(ReactReduxSocketContext);
        }, [ReactReduxSocketContext]);
    }
    catch (err) {
        console.log(err);
    }
};
//# sourceMappingURL=useSocket.js.map