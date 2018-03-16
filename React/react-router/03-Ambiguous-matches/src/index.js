import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './modules/App';



ReactDOM.render(
<BrowserRouter>
   <App />
</BrowserRouter>,
document.getElementById('root')
);
