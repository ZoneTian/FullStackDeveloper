import React,{useReducer} from 'react'
import {counterReducer} from '../store/index'
export default function ReduxHooks() {
    const init = (arg) => arg+=1
    const [state , dispatch ] = useReducer(counterReducer,0,init)
    return (
        <div>
            <h3>ReduxHooks</h3>
    <p>{state}</p>
    <button onClick={()=>dispatch({type:"ADD"})}>add</button>
        </div>
    )
}
