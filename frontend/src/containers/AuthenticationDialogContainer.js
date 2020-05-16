import React, { Component } from 'react';
import { connect } from 'react-redux';
import AuthenticationDialog from '../components/AuthenticationDialog';
import { authRequest, authLogin } from '../actions';
import { clearAuthRequest } from '../actions/index';

class AuthenticationDialogContainer extends Component {
    render() {
        if (this.props.authentication.get('showDialog') === false) {
            return null;
        }
        return <AuthenticationDialog
            authentication={this.props.authentication}
            doAuthenticate={this.props.sendAuthentication}
            doClose={this.props.clearAuthRequest} />;
    }
}

const mapStateToProps = (state) => {
    const authentication = state.get('authentication');
    return { authentication };
};


const mapDispatchToProps = (dispatch) => {
    return {
        handleAuthRequest: () => dispatch(authRequest()),
        clearAuthRequest: () => dispatch(clearAuthRequest()),
        sendAuthentication: (username, password) => dispatch(authLogin(username, password)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationDialogContainer);