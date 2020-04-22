import React,{useCallback} from 'react'
import { useSelector, useDispatch } from 'react-redux'

export default function ReactReduxHookPage() {
    const count = useSelector(({home})=>home);
    const dispatch = useDispatch()
    const add = useCallback(()=>{
        dispatch({type:'ADD'})
    },[dispatch])
    return (
        <div>
            <h3>ReactReduxHookPage</h3>
            <p>{count}</p>
            <button onClick={add}>addSecond</button>
        </div>
    )
}
