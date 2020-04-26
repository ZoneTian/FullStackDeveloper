import React from 'react'
// import PropTypes from 'prop-types'

import { Route, Redirect } from 'react-router-dom'
function PrivateRoute({ isLogin, component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={
                (props) => isLogin ? (<Component />) : <Redirect to={{ pathname: '/login', state: { redirect: props.location.pathname ,'123':'234'} }} />
            }
        >

        </Route>
    )
}

// PrivateRoute.propTypes = {

// }

export default PrivateRoute

