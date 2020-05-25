import React from 'react';
import { connect } from 'react-redux';
import AuthenticationDialog from '../components/AuthenticationDialog';
import actions from '../actions';


const AuthenticationDialogContainer = (props) => {
    return <AuthenticationDialog
        authentication={props.authentication}
        onAuthenticate={props.sendAuthentication}
        onClose={props.hideAuthenticationDialog} />;
}

const mapStateToProps = (state) => ({
    authentication: state.get('authentication'),
});


const mapDispatchToProps = (dispatch) => ({
    hideAuthenticationDialog: () => dispatch(actions.authentication.hideAuthenticationDialog()),
    sendAuthentication: (username, password) => dispatch(actions.authentication.authLogin(username, password)),

})

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationDialogContainer);