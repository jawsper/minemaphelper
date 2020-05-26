import React, { Component } from 'react'
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';

import actions from '../actions';

import Minemap from '../components/Minemap';
import Loading from '../components/Loading';
import { currentWorldSelector, mapsSelector, markersSelector, mapsLoadedSelector, markersLoadedSelector } from '../selectors';


class MinemapContainer extends Component {
    componentDidMount() {
        this._loadMapsAndMarkers();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.currentWorld.get('pk') !== this.props.currentWorld.get('pk')) {
            this._loadMapsAndMarkers();
        }
    }

    _loadMapsAndMarkers() {
        const { currentWorld, handleLoadMaps, handleLoadMarkers } = this.props;
        handleLoadMaps(currentWorld.get('pk'));
        handleLoadMarkers(currentWorld.get('pk'));
    }

    handleSavePosition = (viewport) => {
        this.props.cookies.set('viewport', viewport, { maxAge: 365 * 86400, sameSite: 'strict' });
    }

    render() {
        return (
            <Loading until={this.props.loaded} message="Loading maps">
                <Minemap
                    user={this.props.user}
                    maps={this.props.maps}
                    markers={this.props.markers}
                    handleSaveMap={this.props.handleSaveMap}
                    handleSavePosition={this.handleSavePosition}
                    viewport={this.props.cookies.get('viewport')}
                />
            </Loading>
        );
    }
}
const mapStateToProps = state => ({
    currentWorld: currentWorldSelector(state),
    maps: mapsSelector(state),
    markers: markersSelector(state),
    user: state.getIn(['authentication', 'user']),
    loaded: mapsLoadedSelector(state) && markersLoadedSelector(state),
});

const mapDispatchToProps = (dispatch) => ({
    handleSaveMap: (coords, map_id) => dispatch(actions.maps.saveMap(coords, map_id)),
    handleLoadMaps: (world) => dispatch(actions.maps.loadMaps(world)),
    handleLoadMarkers: (world) => dispatch(actions.markers.loadMarkers(world)),
});

export default withCookies(connect(mapStateToProps, mapDispatchToProps)(MinemapContainer));