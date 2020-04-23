import React from 'react'
// import {connect } from 'react-redux'
import { bindActionCreators,connect } from '../kredux/'
export default connect(
    ({home})=>({home}),
    // {
    //     add:()=>({type:'ADD'})
    // }
    dispatch => {
        const add = ()=>({type:'ADD'})
        let creators = {
            add:()=>dispatch(add)
        }
        creators = bindActionCreators(creators,dispatch)
        console.log(dispatch,creators,'s123')

        return {
            ...creators,
            dispatch
        }
    }
    )(class ReactReduxPage extends React.Component {
        dispatchAdd = () => {
            this.props.dispatch({
              type: "ADD"
            });
          };
        render(){
            const { add } = this.props
            console.log('====================================');
            console.log(this.props);
            console.log('====================================');
            return (
                <div>
                    <h3>ReactReduxPage</h3>
                    <p>{this.props.home}</p>
                    <button onClick={this.dispatchAdd}>dispatch add</button>
                    <button onClick={add}>add</button>
                </div>
            )
        }
   
}
)