import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createBrowserHistory } from 'history';
import { routerMiddleware } from 'connected-react-router/immutable'

import createRootReducer from './reducers';
import getAxiosMiddleware from './axiosMiddleware';

const loggerMiddleware = createLogger();

export const history = createBrowserHistory();

export default function configureStore(preloadedState = undefined) {
    const middlewares = [
        routerMiddleware(history), // for dispatching history actions
        thunkMiddleware,
        loggerMiddleware,
        getAxiosMiddleware(),
    ]
    const middlewareEnhancer = applyMiddleware(...middlewares)

    const enhancers = [middlewareEnhancer]
    const composedEnhancers = composeWithDevTools(...enhancers)

    const store = createStore(
        createRootReducer(history),
        preloadedState,
        composedEnhancers
    )

    return store;
}