import React from 'react';
import {Route,Link} from 'react-router-dom';

function App(){
    <div>
        <h1>Accounts</h1>
        <ul>
            <li>
                <Link to="/netflix">Netflix</Link>
            </li>
            <li>
                <Link to="/zillow-group">Zillow Group</Link>
            </li>
            <li>
                <Link to="/yahoo">Yahoo</Link>
            </li>
            <li>
                <Link to="/modus-create">Modus Create</Link>
            </li>
        </ul>
        <Route path="/:id" component={Child}/>
        {/*
         It's possible to use regular expressions to control what param values should be matched.
            * "/order/asc"  - matched
            * "/order/desc" - matched
            * "/order/foo"  - not matched
      */}
      <Route path="/order/:direction(asc|desc)"
      component={ComponentWithRegex}
       />      
    </div>
}
export default App;