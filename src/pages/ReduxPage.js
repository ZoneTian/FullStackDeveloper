import React, { Component } from 'react'
import { connect } from 'react-redux'

// import store from '../store'

@connect(
  ({home})=>({count:home}),
)
class ReduxPage extends Component {
  // componentDidMount(){
  //   //store里的store变化 执行callback

  //  this.unsubscribe =   store.subscribe(()=>{
  //     this.forceUpdate()
  //   })
  // }
  // componentWillUnmount(){
  //   this.unsubscribe &&   this.unsubscribe()
  // }
  add=()=>{
      this.props.dispatch({type:'ADD',payload:1})
  }
  // Aysnadd = ()=>{
  //   store.dispatch((dispatch,getState)=>{
  //     setTimeout(()=>{
  //       store.dispatch({type:'ADD',payload:100})
  //     },1000)
  //   })
  // }
  // promiseMinus=()=>{
    
  //   store.dispatch(Promise.resolve({type:'MINUS',payload:100}))
  // }
  render() {
    const { count} = this.props
    return (
      <div>
        <h3>reduxpage</h3>
        <div >{count}</div>
       <div><button onClick = {this.Aysnadd }> Aysnadd </button></div> 
       <div><button onClick = {this.promiseMinus }> promiseMinus</button></div> 

        <button onClick = {this.add }> add </button>
      </div>
    )
  }
}
export default  ReduxPage