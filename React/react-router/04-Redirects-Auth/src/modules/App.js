import React from 'react';
import {Route,Link,Redirect,withRouter} from "react-router-dom";
import AuthButton from './AuthButton';
import Public from './Public';
import Login from './Login';
import Protected from './Protected';
import PrivateRoute from './PrivateRoute';
////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

function App(){
    <div>
        <AuthButton />
        <ul>
            <li>
                <Link to="/public">Public Page</Link>
            </li>
            <li>
                <Link to="/protected">Protected Page</Link>
            </li>
        </ul>
        <Route path="/public" component={Public}/>
        <Route path="/login" component={Login}/>
        <PrivateRoute path="/protected" component={Protected}/>
    </div>
}

export default App;