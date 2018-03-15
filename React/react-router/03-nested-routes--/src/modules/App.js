import React from 'react';
import {Link} from 'react-router-dom'

function App(){
    return (
        <div>
            <h1>React Router Tutorial</h1>
            <ul role="nav">
                <li><Link to="/about">About</Link></li>
                <li><Link to="/repos">Repos</Link></li>
            </ul>
            {this.React.children}
        </div>
    )
}
export default App;