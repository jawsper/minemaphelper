import React from 'react';
import HeaderContainer from './HeaderContainer';
import MinemapContainer from './MinemapContainer';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import Immutable from 'immutable';

import actions from '../actions';
import AuthenticationDialogContainer from './AuthenticationDialogContainer';
import Loading from '../components/Loading';
import { userSelector, worldsLoadedSelector, currentWorldSelector } from '../selectors';

class AppContainer extends React.Component {
    componentDidMount() {
        this.props.handleCheckLoggedIn();
    }

    componentDidUpdate(prevProps, prevState) {
        // When user changes, load worlds
        if (!Immutable.is(prevProps.user, this.props.user)) {
            this.props.handleLoadWorlds();
        }
    }

    render() {
        return (
            <div>
                <HeaderContainer />
                <Route path="/auth/login">
                    <AuthenticationDialogContainer />
                </Route>
                <Loading until={this.props.worlds_loaded === true} message="Loading worlds">
                    {this.props.current_world ? <MinemapContainer /> : null}
                </Loading>
            </div>
        );
    }
}

const mapStatetoProps = (state) => {
    const user = userSelector(state);
    const worlds_loaded = worldsLoadedSelector(state);
    const current_world = currentWorldSelector(state);
    return { user, worlds_loaded, current_world };
}

const mapDispatchToProps = (dispatch) => {
    return {
        handleCheckLoggedIn: () => dispatch(actions.authentication.authCheckLogin()),
        handleLoadWorlds: () => dispatch(actions.worlds.loadWorlds()),
    }
}


export default connect(mapStatetoProps, mapDispatchToProps)(AppContainer);