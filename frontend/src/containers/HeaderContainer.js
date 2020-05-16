import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import { authRequest, authCheckLogin, authLogout } from '../actions';

class HeaderContainer extends Component {
    componentDidMount() {
        this.props.handleCheckLoggedIn();
    }

    render() {
        return (
            <Header 
                handleLogin={this.props.handleLogin}
                handleLogout={this.props.handleLogout}
                authentication={this.props.authentication} />
        );
    }
}

function mapStateToProps(state) {
    const authentication = state.get('authentication');
    return { authentication };
}

function mapDispatchToProps(dispatch) {
    return {
        handleCheckLoggedIn: () => dispatch(authCheckLogin()),
        handleLogin: () => dispatch(authRequest()),
        handleLogout: () => dispatch(authLogout()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)