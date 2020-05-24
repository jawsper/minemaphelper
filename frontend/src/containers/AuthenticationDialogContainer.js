import React from 'react';
import { connect } from 'react-redux';
import AuthenticationDialog from '../components/AuthenticationDialog';
import actions from '../actions';


const AuthenticationDialogContainer = (props) => {
    if (props.authentication.get('showDialog') === false) {
        return null;
    }
    return <AuthenticationDialog
        authentication={props.authentication}
        onAuthenticate={props.sendAuthentication}
        onClose={props.clearAuthRequest} />;
}

const mapStateToProps = (state) => ({
    authentication: state.get('authentication'),
});


const mapDispatchToProps = (dispatch) => ({
    handleAuthRequest: () => dispatch(actions.authentication.authRequest()),
    clearAuthRequest: () => dispatch(actions.authentication.clearAuthRequest()),
    sendAuthentication: (username, password) => dispatch(actions.authentication.authLogin(username, password)),

})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationDialogContainer);