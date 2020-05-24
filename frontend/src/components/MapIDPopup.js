import React, { Component } from "react";
import { Popup } from 'react-leaflet';
import PropTypes from 'prop-types';

import MapIDPopupForm from './MapIDPopupForm';
import { Alert } from "react-bootstrap";

export default class MapIDPopup extends Component {
    static propTypes = {
        coords: PropTypes.shape({
            x: PropTypes.number,
            z: PropTypes.number,
            zoom: PropTypes.number,
        }),
        map_id: PropTypes.number,
        position: PropTypes.shape({
            lat: PropTypes.number.isRequired,
            lng: PropTypes.number.isRequired,
        }),

        onSave: PropTypes.func.isRequired,
        onClose: PropTypes.func.isRequired,
    };

    render() {
        if (this.props.position === null) return null;
        const error = this.props.error
            ? <Alert variant="warning"><b>Failed</b>: {this.props.error}</Alert>
            : null;
        return (
            <Popup
                minWidth={300}
                position={this.props.position}
                onClose={this.props.onClose}>
                {error}
                <MapIDPopupForm
                    coords={this.props.coords}
                    map_id={this.props.map_id}
                    onSave={this.props.onSave} />
            </Popup>
        );
    }
}