import React from 'react';
import {Route,StaticRouter} from 'react-router-dom';

function RouteStatus(props){
    return (
        <Route render={
            ({staticContext}) => {
                if({staticContext}){
                    staticContext.statusCode = props.statusCode;
                }
                return <div>{props.children}</div>;
            }
        }/>
    )
}

function PrintContext(props){
    return (
        <p>Static context: {JSON.stringify(props.staticContext)}</p>
    )
}

class App extends React.Component{
    staticContext = {};
    render(){
        return (
            <StaticRouter location="/foo" context={this.staticContext}>
                <div>
                    <RouteStatus statusCode={404}>
                        <p>Route with statusCode 404</p>
                        <PrintContext staticContext = {this.staticContext}/>
                    </RouteStatus>    
                </div>
            </StaticRouter>
        )
    }
}

export default App;