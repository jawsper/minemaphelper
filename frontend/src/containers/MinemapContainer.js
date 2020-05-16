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
                user={this.props.user}
                maps={this.props.maps}
                markers={this.props.markers}
                handleSaveMap={this.props.handleSaveMap}
            />
        );
    }
}

function mapStateToProps(state) {
    const maps = state.getIn(['maps', 'maps']);
    const markers = state.getIn(['markers', 'markers']);
    const user = state.getIn(['authentication', 'user']);
    const loaded = state.getIn(['maps', 'loaded']) && state.getIn(['markers', 'loaded']);
    return { loaded, maps, markers, user };
}

function mapDispatchToProps(dispatch) {
    return {
        handleSaveMap: (coords, map_id) => dispatch(saveMap(coords, map_id)),
        handleLoadMaps: () => dispatch(loadMaps()),
        handleLoadMarkers: () => dispatch(loadMarkers()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MinemapContainer)