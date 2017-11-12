import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './app';
import store from './app/store';

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>    
, document.getElementById('root'));