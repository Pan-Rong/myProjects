import React from 'react';
import {Route,Link,Redirect,withRouter} from "react-router-dom";

const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb){
        this.isAuthenticated = true;
        setTimeout(cb,100); 
    },
    signout(cb){
        this.isAuthenticated = false;
        setTimeout(cb,100);
    }
};
function AuthButton (){

    return (
        withRouter(function({history}){
            return (
                fakeAuth.isAuthenticated ? (
                    <p>
                        Welcome!{" "}
                        <button onClick ={()=>{
                            fakeAuth.signout(()=>history.push("/"));
                            }}>
                            Sign out
                        </button>
                    </p>
                ):(
                    <p>You are not logged in.</p>
                )
            )
        })
    )
}
export default AuthButton;