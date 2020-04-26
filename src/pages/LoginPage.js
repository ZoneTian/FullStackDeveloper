import React from 'react'
// import PropTypes from 'prop-types'
import {Redirect} from 'react-router-dom'
function LoginPage(props) {
    const {location,isLogin} = props;
    const { redirect  = "/"}  = location.state || {}
    console.log(redirect && redirect,'re')
    if(isLogin){
        return <Redirect to ={redirect}/>
    }
    return (
        <div>
            <h3>LoginPage</h3>
        </div>
    )
}

// LoginPage.propTypes = {

// }

export default LoginPage

