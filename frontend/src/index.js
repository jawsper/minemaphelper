import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import configureStore, { history } from './configureStore';

import AppContainer from "./containers/AppContainer";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <AppContainer />
        </ConnectedRouter>
    </Provider>,
    document.getElementById('root')
);
