import React from 'react'
// import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom'

import HomePage from './HomePage'
import LoginPage from './LoginPage'
import UserPage from './UserPage'
import ErrorPage from './ErrorPage'
import PrivateRoute from './PrivateRoute'
function RouterPage(props) {
    return (
        <div>
            <h3>RouterPage</h3>
            <Router>
                <Link to='/'> 首页</Link>
                <Link to='/login'> 登陆</Link>
                <Link to='/user'> 用户中心</Link>

                <Switch>
                    <Route path='/' exact component={HomePage} children={ChildrenCMP} render={RenderCMP}></Route>
                    <PrivateRoute  path='/user' component={UserPage}/> 
                    <Route strict exact sensitive path='/login' component={LoginPage}></Route>
                    {/* <Route strict exact  sensitive path='/user' component={UserPage}></Route> */}
                    <Route component={ErrorPage}></Route>

                </Switch>
            </Router>
        </div>
    )
}

// RouterPage.propTypes = {

// }
function ChildrenCMP (){
    return <div>ChildrenCMP</div>
}
function RenderCMP (){
    return <div>RenderCMP</div>
}
export default RouterPage

