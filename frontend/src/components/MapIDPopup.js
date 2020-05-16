import React, { Component } from "react";

import { Popup } from 'react-leaflet';
import MapIDPopupForm from './MapIDPopupForm';

export default class MapIDPopup extends Component {
    render() {
        if (this.props.position === null) return null;
        return <Popup
            minWidth={300}
            position={this.props.position}
            onClose={this.props.onClose}>
            <MapIDPopupForm
                coords={this.props.coords}
                map_id={this.props.map_id}
                onSave={this.props.onSave} />
        </Popup>;
    }
}