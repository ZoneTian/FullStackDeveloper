// import createStore from "./createStore";

export default function applyMiddleware(...middlewares){
    console.log(middlewares,'123')
    return createStore => reducer => {
        let store = createStore(reducer)
        let dispatch = store.dispatch;
        const midApi = {
            getState:store.getState,
            dispatch
        }
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
    console.log(funcs)
    if (funcs.length === 0) {
      return arg => arg
    }
  
    if (funcs.length === 1) {
      return funcs[0]
    }
  
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
  }