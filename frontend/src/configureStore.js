import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

import createRootReducer from './reducers';
import getAxiosMiddleware from './axiosMiddleware';

const loggerMiddleware = createLogger();


export default function configureStore(preloadedState = undefined) {
    const middlewares = [
        thunkMiddleware,
        loggerMiddleware,
        getAxiosMiddleware(),
    ]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(
        createRootReducer(),
        preloadedState,
        composedEnhancers
    )

    return store;
}