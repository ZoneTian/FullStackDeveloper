import createStore from "./createStore";
import applyMiddleware from './applyMiddleware'
import combineReducers  from "./combineReducers";
import { Provider, connect} from './reactRedux'

import {useSelector,useDispatch} from './reduxHooks'
function bindActionCreator(creator,dispatch){
    return (...arg) => dispatch(creator(...arg))
}
function bindActionCreators(creators,dispatch){
    let obj = {}
    for (const key in creators) {
         
        obj[key] = bindActionCreator(creators[key],dispatch)
    }
    return obj 
}
export {
    createStore,
    applyMiddleware,
    combineReducers,
    bindActionCreators,
    Provider,
    connect,
    useSelector,
    useDispatch
};
