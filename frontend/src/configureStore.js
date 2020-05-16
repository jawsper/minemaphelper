import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import axiosMiddleware from 'redux-axios-middleware';

import rootReducer from './reducers';
import Axios from 'axios';

const loggerMiddleware = createLogger();
const client = Axios.create({
    baseURL: '/api/',
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFToken',
});

export default function configureStore(preloadedState) {
    const middlewares = [
        thunkMiddleware, 
        loggerMiddleware,
        axiosMiddleware(client),
    ]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(rootReducer, preloadedState, composedEnhancers)

    return store
}