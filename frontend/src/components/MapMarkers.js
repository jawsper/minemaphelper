import React, { Component } from "react";

import { Popup, Marker } from 'react-leaflet';

export default class MapMarkers extends Component {
    render() {
        return this.props.markers.toList().toJS().map((marker, index) =>
            <Marker key={index} position={{ lng: marker.x, lat: marker.z }}>
                <Popup>{marker.text}</Popup>
            </Marker>
        );
    }
}