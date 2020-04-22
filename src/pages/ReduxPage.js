import React, { Component } from 'react'
import store from '../store'
export default class ReduxPage extends Component {
  componentDidMount(){
    //store里的store变化 执行callback

   this.unsubscribe =   store.subscribe(()=>{
      this.forceUpdate()
    })
  }
  componentWillUnmount(){
    this.unsubscribe &&   this.unsubscribe()
  }
  add=()=>{
      store.dispatch({type:'ADD',payload:1})
  }
  Aysnadd = ()=>{
    store.dispatch((dispatch,getState)=>{
      setTimeout(()=>{
        store.dispatch({type:'ADD',payload:100})
      },1000)
    })
  }
  promiseMinus=()=>{
    
    store.dispatch(Promise.resolve({type:'MINUS',payload:100}))
  }
  render() {
    
    return (
      <div>
        <h3>reduxpage</h3>
        <div >{store.getState().home}</div>
       <div><button onClick = {this.Aysnadd }> Aysnadd </button></div> 
       <div><button onClick = {this.promiseMinus }> promiseMinus</button></div> 

        <button onClick = {this.add }> add </button>
      </div>
    )
  }
}
