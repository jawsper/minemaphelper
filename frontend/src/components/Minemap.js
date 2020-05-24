import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ImmutablePropTypes from 'react-immutable-proptypes';

import { Map } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import { leaflet_coordinate_to_minecraft_map_coordinate } from '../util';
import MapMarkers from './MapMarkers';
import MapIDPopup from './MapIDPopup';
import MinecraftGridLayer from './MinecraftGridLayer';
import MinecraftCRS from '../leaflet/MinecraftCRS';

const DEFAULT_VIEWPORT = {
    center: { lng: 191.5, lat: -63.5 },
    zoom: 0,
}

export default class Minemap extends Component {
    static propTypes = {
        maps: ImmutablePropTypes.map.isRequired,
        markers: ImmutablePropTypes.map,
        user: ImmutablePropTypes.map,
        viewport: PropTypes.shape({
            center: PropTypes.arrayOf(PropTypes.number),
            zoom: PropTypes.number
        }),

        handleSaveMap: PropTypes.func.isRequired,
        handleSavePosition: PropTypes.func.isRequired,
    };


    state = {
        popup: {
            position: null,
            coords: null,
            map_id: null,
            error: null,
        },
        viewport: this.props.viewport || DEFAULT_VIEWPORT,
    }

    handleMapClick = (e) => {
        if (this.state.popup.position !== null) {
            this.setState({ popup: { position: null } });
            return;
        }

        if (this.props.user === null || this.props.user.get('anonymous') === true) {
            return;
        }

        const { lat, lng } = e.latlng;
        const zoom = e.target.getZoom();
        if (zoom !== 0) return;
        const x = leaflet_coordinate_to_minecraft_map_coordinate(lng, zoom);
        const z = leaflet_coordinate_to_minecraft_map_coordinate(lat, zoom);

        const coords = { x, z, zoom: Math.abs(zoom) };

        const map_id = this.props.maps.getIn([coords.zoom, coords.z, coords.x]);

        const popup = { position: e.latlng, coords, map_id };
        this.setState({ popup });
    };

    handlePopupSave = (coords, map_id) => {
        map_id = parseInt(map_id, 10);
        if (isNaN(map_id)) {
            map_id = null;
        }

        this.props.handleSaveMap(coords, map_id)
            .then(result => {
                // console.log('handleSaveMap.then', result);
                if (result.error) {
                    this.setState(state => {
                        const popup = { ...state.popup, error: result.error.response.data.detail };
                        return { ...state, popup };
                    })
                } else { this.setState({ popup: { position: null } }); }
            });
    };

    handlePopupClosed = (e) => {
        this.setState({ popup: { position: null } });
    };


    onViewportChanged = (viewport) => {
        // The viewport got changed by the user, keep track in state
        // this.setState({ viewport })
        this.props.handleSavePosition(viewport);
    }

    render() {
        return (
            <div id="map_container">
                <Map id="map"
                    crs={MinecraftCRS}
                    onClick={this.handleMapClick}
                    closePopupOnClick

                    viewport={this.state.viewport}
                    onViewportChanged={this.onViewportChanged}
                    minZoom={-3} // This is set explicitly to allow restoring zoom levels other than 0.
                >
                    <MinecraftGridLayer
                        maps={this.props.maps}
                    />
                    <MapMarkers markers={this.props.markers} />
                    <MapIDPopup
                        {...this.state.popup}
                        onSave={this.handlePopupSave}
                        onClose={this.handlePopupClosed} />
                </Map>
            </div>
        );
    }
}