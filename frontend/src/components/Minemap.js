import React, { Component } from 'react';

import { Map, withLeaflet, GridLayer } from 'react-leaflet';
import L from 'leaflet';


import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';

import minecraftGridLayer from './MinecraftGridLayer';
import { leaflet_coordinate_to_minecraft_map_coordinate } from '../util';
import MapMarkers from './MapMarkers';
import MapIDPopup from './MapIDPopup';

const MineGridLayer = withLeaflet(class MineGridLayer extends GridLayer {
    createLeafletElement(props) {
        return minecraftGridLayer(this.getOptions(props));
    }

    updateLeafletElement(fromProps, toProps) {
        const { opacity, zIndex, maps } = toProps
        if (opacity !== fromProps.opacity) {
            this.leafletElement.setOpacity(opacity)
        }
        if (zIndex !== fromProps.zIndex) {
            this.leafletElement.setZIndex(zIndex)
        }
        if (!maps.equals(fromProps.maps)) {
            this.leafletElement.options.maps = maps;
            this.leafletElement.redraw();
        }
    }
});

const MinecraftCRS = L.Util.extend({}, L.CRS.Simple, {
    transformation: L.transformation(1, 64, 1, 64),
});

const DEFAULT_VIEWPORT = {
    center: { lng: 191.5, lat: -63.5 },
    zoom: 0,
}

export default class Minemap extends Component {
    state = {
        popup: {
            position: null,
            coords: null,
            map_id: null,
        },
        viewport: DEFAULT_VIEWPORT,
    }

    handleMapClick = (e) => {
        if (this.state.popup.position !== null) {
            this.setState({ popup: { position: null } });
            return;
        }

        if (this.props.user === null) {
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

        this.props.handleSaveMap(coords, map_id);
        this.setState({ popup: { position: null } });
    };

    handlePopupClosed = (e) => {
        this.setState({ popup: { position: null } });
    };


    onViewportChanged = (viewport) => {
        // The viewport got changed by the user, keep track in state
        this.setState({ viewport })
    }

    render() {
        return (
            <Map id="map"
                crs={MinecraftCRS}
                onClick={this.handleMapClick}
                closePopupOnClick

                viewport={this.state.viewport}
                onViewportChanged={this.onViewportChanged}
            >
                <MineGridLayer
                    maps={this.props.maps}
                />
                <MapMarkers markers={this.props.markers} />
                <MapIDPopup
                    {...this.state.popup}
                    onSave={this.handlePopupSave}
                    onClose={this.handlePopupClosed} />
            </Map>
        );
    }
}