import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter,Route} from 'react-router-dom';
import App from './modules/App';
import About from './modules/About';
import Repos from './modules/Repos';
import './index.css';


ReactDOM.render(
   <BrowserRouter>
    <div>
      <Route exact path="/" component={App}>App</Route>
      <Route path="/repos" component={Repos}>Repos</Route>
      <Route path="/about" component={About}>About</Route>
    </div>  
   </BrowserRouter>, 
  document.getElementById('root')
  );

  
