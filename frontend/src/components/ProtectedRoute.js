import React from 'react';
import {Route, Redirect} from 'react-router-dom'
import {SignContext} from "../contexts/SignContext";

function ProtectedRoute({component: Component,...props}) {
    const logContext = React.useContext(SignContext)
    const {loggedIn} = logContext
    return (
        <Route>
            {loggedIn ? <Component {...props}/> : <Redirect to='/sign-in'/>}
        </Route>
    )
}

export default ProtectedRoute