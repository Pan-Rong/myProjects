import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom';
import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import { createLogger } from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const middleware = [ thunk ];

if (process.env.NODE_ENV !=='production'){
    middleware.push(createLogger());
}

let store = createStore(
    rootReducer,
    applyMiddleware(...middleware)
);

ReactDOM.render(
<Provider store={store}>
    <BrowserRouter>
        <App />
    </BrowserRouter>
</Provider>,  
document.getElementById('root'));
registerServiceWorker();
