import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router/immutable';
import { CookiesProvider } from 'react-cookie';

import configureStore, { history } from './configureStore';
import AppContainer from "./containers/AppContainer";

const store = configureStore();

ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <ConnectedRouter history={history}>
                <AppContainer />
            </ConnectedRouter>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);
