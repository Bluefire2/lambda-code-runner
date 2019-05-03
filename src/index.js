import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import ReduxPromise from "redux-promise-middleware";
import createSagaMiddleware from "redux-saga";
import {composeWithDevTools} from 'redux-devtools-extension';

import reducers from './reducers';
import './index.css';
import App from './App/App';
import * as serviceWorker from './serviceWorker';
import {animateSaga} from "./actions";

const Saga = createSagaMiddleware();
const store = createStore(reducers, composeWithDevTools(
    applyMiddleware(ReduxPromise, Saga),
    // other store enhancers if any
));

Saga.run(animateSaga);

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
