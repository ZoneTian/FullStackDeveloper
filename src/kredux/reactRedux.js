import React, { useContext, useLayoutEffect, useReducer } from 'react'

const Context = React.createContext()

//组件复合s
//存store
export function Provider({ children, store }) {
    return <Context.Provider value={store}>{children}</Context.Provider>


}
export const connect = (mapStateToProps, mapDispatchToProps) => WraperComponent => props => {
    const context = useContext(Context)
    console.log(context,'creators')
    const { getState, dispatch, subscribe } = context
    const stateProps = mapStateToProps(getState())
    const dispatchProps = { dispatch }
    console.log(stateProps,mapDispatchToProps,dispatchProps)
    const [, forceUpdate] = useReducer(x => x + 1, 0)
    useLayoutEffect(() => {
      const unsubscribe =   subscribe(() => {
            forceUpdate()
        })
        return ()=>{unsubscribe()}
    },[])
    return <WraperComponent {...props} {...stateProps} {...dispatchProps} />
}

