// import createStore from "./createStore";

export default function applyMiddleware(...middlewares){
    return createStore => reducer => {
        let store = createStore(reducer)
        let dispatch = store.dispatch;
        
        const midApi = {
            getState:store.getState,
            dispatch
        }
        console.log(store.getState())
        const miiddlewareChain =middlewares.map(md=>md(midApi))
        
        dispatch = compose(...miiddlewareChain)(store.dispatch)
        return {
            ...store,
            dispatch
            //加强dispatch 能够接受 function promise
        }
    }

}
function compose(...funcs) {
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }