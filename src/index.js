import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Router,Route,browserHistory } from 'react-router';
// //files from redux
import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { Provider } from 'react-redux';
import { board } from './reducers/board';
import { auth } from './reducers/auth';

const reducers = combineReducers({
    board: board,
    auth: auth
});

const store = createStore(
    reducers, 
    applyMiddleware(thunkMiddleware)
);

function verifyLogin() {
    if(localStorage.getItem('token') === null){
        browserHistory.replace('/?valid_login=0');
    }
}

function verifyScreen() {
    if(localStorage.getItem('token') !== null){
        browserHistory.push('/general');
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/" component={Login} onEnter={verifyScreen}/>
            <Route path="/general" component={App} onEnter={verifyLogin} />
        </Router>
    </Provider>,
    document.getElementById('root')
)