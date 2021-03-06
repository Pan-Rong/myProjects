import React from 'react';
import { Route,Link} from 'react-router-dom';
import About from './About';
import Home from './Home';
import Topics from './Topics'

function App(){
    return (
        <div>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li >
                    <Link to="/topics">Topics</Link>
                </li>
            </ul>
            <hr/>
            <Route exact path="/" component={Home}/>
            <Route path="/about" component={About}/>
            <Route path="/topics" component={Topics}/>
        </div>
    )
}

export default App;
