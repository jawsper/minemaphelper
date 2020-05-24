import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from '../components/Header';
import actions from '../actions';
import { currentWorldIDSelector, worldsLoadedSelector, worldsListSelector } from '../selectors';

class HeaderContainer extends Component {
    render() {
        return (
            <Header
                handleLogin={this.props.handleLogin}
                handleLogout={this.props.handleLogout}
                handleSearch={this.props.handleSearch}
                authentication={this.props.authentication}
                current_world={this.props.current_world}
                worlds_loaded={this.props.worlds_loaded}
                worlds={this.props.worlds}
                onSelectWorld={this.props.handleSelectWorld} />
        );
    }
}

const mapStateToProps = state => ({
    authentication: state.get('authentication'),
    current_world: currentWorldIDSelector(state),
    worlds_loaded: worldsLoadedSelector(state),
    worlds: worldsListSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    handleCheckLoggedIn: () => dispatch(actions.authentication.authCheckLogin()),
    handleLogin: () => dispatch(actions.authentication.authRequest()),
    handleLogout: () => dispatch(actions.authentication.authLogout()),

    handleSearch: (query) => { console.log('search', query) },

    handleSelectWorld: (world) => dispatch(actions.worlds.selectWorld(world)),
});


export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer)