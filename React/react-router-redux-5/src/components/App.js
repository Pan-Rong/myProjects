import React, { Component } from 'react';
import { Route,Switch,Redirect} from 'react-router-dom';
import { routes } from '../routes';
import NavbarBtm from './NavbarBtm';

class App extends Component {

    render() {
      return (
        <div>
          <Route exact path="/"  render={()=><Redirect to="/popular"/>} />
          <Route exact path="/my"  render={()=><Redirect to="/my/history"/>} />
          <Switch>
          {routes.map((route,i) => (
            <Route key={i} 
              path = {route.path}
              render = {props => ( 
                // pass the sub-routes down to keep nesting  
                <route.component {...props} routes = {route.routes}/>
            )}
        />
          ))}
          </Switch>  
          <NavbarBtm />
        </div>
      );
    }
  }

  
  export default App;
