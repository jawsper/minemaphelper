import React, { Component } from 'react'
import { connect } from 'react-redux';

import { loadMaps, loadMarkers, authRequest, saveMap } from '../actions';

import Minemap from '../components/Minemap';

class MinemapContainer extends Component {
    componentDidMount() {
        this.props.handleLoadMaps();
        this.props.handleLoadMarkers();
    }

    render() {
        if (!this.props.loaded) {
            return 'Loading...';
        }
        return (
            <Minemap
                user={this.props.authentication.get('user')}
                maps={this.props.maps}
                markers={this.props.markers}
                handleAuthRequest={this.props.handleAuthRequest}
                handleSaveMap={this.props.handleSaveMap}
            />
        );
    }
}

function mapStateToProps(state) {
    const maps = state.getIn(['maps', 'maps']);
    const markers = state.getIn(['markers', 'markers']);
    const authentication = state.get('authentication');
    const loaded = state.getIn(['maps', 'loaded']) && state.getIn(['markers', 'loaded']);
    return { loaded, maps, markers, authentication };
}

function mapDispatchToProps(dispatch) {
    return {
        handleSaveMap: (coords, map_id) => dispatch(saveMap(coords, map_id)),
        handleLoadMaps: () => dispatch(loadMaps()),
        handleLoadMarkers: () => dispatch(loadMarkers()),
        handleAuthRequest: () => dispatch(authRequest()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MinemapContainer)