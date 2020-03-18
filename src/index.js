import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import App from './App'
import { AuthChk } from './util/auth-storage'
import { login, reg } from './router'

AuthChk()

ReactDOM.render(<Router>
    <Route exact path={login.path} component={login.component} />
    <Route exact path={reg.path} component={reg.component} />
    <App />
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
