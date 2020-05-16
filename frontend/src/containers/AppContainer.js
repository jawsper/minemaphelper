import React, { Component } from 'react';
import HeaderContainer from './HeaderContainer';
import MinemapContainer from './MinemapContainer';
import { connect } from 'react-redux';

import AuthenticationDialogContainer from './AuthenticationDialogContainer';

class AppContainer extends Component {
    render() {
        return (
            <div>
                <HeaderContainer />
                <AuthenticationDialogContainer />
                <MinemapContainer />
            </div>
        )
    }
}

export default connect()(AppContainer);