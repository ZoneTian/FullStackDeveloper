export default function createStore(reducer,enhancer) {
  if(enhancer){
    return enhancer(createStore)(reducer)
  }
  let currentState ;
  let currentListeners = [];
  //获取store
  function getState() {
    return currentState;
  }
  //store的数据更新
  function dispatch(action) {
    
    currentState = reducer(currentState, action);

    //订阅事件
    currentListeners.forEach(listener => listener());
  }

  function subscribe(listener) {
    currentListeners.push(listener);
    return ()=>{
      currentListeners = []
    }
  }
  // dispatch({type:'KKKK'})

  return {
    getState,
    dispatch,
    subscribe
  };
}
