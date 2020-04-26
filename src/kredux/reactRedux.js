import React, { useContext, useLayoutEffect, useReducer } from 'react'
import { bindActionCreators } from './index'

const Context = React.createContext()

//组件复合s
//存store
export function Provider({ children, store }) {
    return <Context.Provider value={store}>{children}</Context.Provider>


}
export const connect = (mapStateToProps, mapDispatchToProps) => WraperComponent => props => {
    const context = useContext(Context)
    const { getState, dispatch, subscribe } = context
    const stateProps = mapStateToProps(getState())
    let dispatchProps = { dispatch }
    if (typeof mapStateToProps === 'function') {
        dispatchProps = mapDispatchToProps(dispatch)
    }else if (typeof mapDispatchToProps === 'object') {
        dispatchProps = bindActionCreators(mapDispatchToProps,dispatch)
    }
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    useLayoutEffect(() => {
      const unsubscribe =   subscribe(() => {
            forceUpdate()
        })
        return ()=>{unsubscribe()}
    },[subscribe])
    return <WraperComponent {...props} {...stateProps} {...dispatchProps} />
}

export function useStore(){
    const store = useContext(Context)
    console.log(store.getState())
    return store
}