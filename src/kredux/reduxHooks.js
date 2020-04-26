import {useStore} from './reactRedux'
import {useLayoutEffect,useReducer} from 'react'
export function useSelector(selecotr){
    const store =useStore()
    const { getState,subscribe } = store
  
    const selectState = selecotr(getState())
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    useLayoutEffect(() => {
        const unsubscribe =   subscribe(() => {
              forceUpdate()
          })
          return ()=>{unsubscribe()}
      },[store, subscribe])

    return selectState
}

export function useDispatch(){
    const store = useStore()
    return store.dispatch
}

