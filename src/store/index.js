// import {createStore ,applyMiddleware} from "redux";
// import thunk from 'redux-thunk'
// import logger from 'redux-logger'
import { createStore, applyMiddleware,combineReducers } from "../kredux/";
import isPromise from 'is-promise'
import { isFSA } from 'flux-standard-action'
//定义修改规则
export const counterReducer = (state = 0, { type, payload = 1 }) => {
  switch (type) {
    case "ADD":
      return state + payload;
    case "MINUS":
      return state - payload;
    default:
      return state;
  }
};

const store = createStore(combineReducers({home:counterReducer}), applyMiddleware(thunk, logger, rdPromise));
function logger({ getState }) {
  return next => action => {
    console.log("prev", getState());
    const nowValue = next(action);
    console.log("next", getState());

    return nowValue

  }
}
function thunk({ dispatch, getState }) {
  return next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState)
    }
    return next(action)
  }
}

function rdPromise({ dispatch, getState }) {
  return next => action => {
    if (!isFSA(action)) {
      return isPromise(action)?action.then(dispatch) :next(action)
      // return action(dispatch, getState)
    }
    return next(action)
  }
}
export default store;
