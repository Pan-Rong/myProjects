import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom'
import './index.css';
import App from './modules/App';
import About from './modules/About';
import Repos from './modules/Repos';


ReactDOM.render(
<BrowserRouter>
    <div>
        <Route  path="/" component={App}>
            <Route path="/about" component={About}>About</Route>
            <Route path="/repos" component={Repos}>Repos</Route>
        </Route>
    </div>
</BrowserRouter>,
document.getElementById('root')
);

