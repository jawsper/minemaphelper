import React from "react";
import ReactDOM from "react-dom";

import { Provider } from 'react-redux';
import configureStore from './configureStore';

import AppContainer from "./containers/AppContainer";

const store = configureStore();

ReactDOM.render(
    <Provider store={store}>
        <AppContainer />
    </Provider>,
    document.getElementById('root')
);