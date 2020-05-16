import React, { Component } from 'react';
import { Form, Button, Col } from 'react-bootstrap';

export default class MapIDPopupForm extends Component {
    state = {
        map_id: this.props.map_id === null ? '' : this.props.map_id
    }

    constructor(props) {
        super(props);
        this.inputField = React.createRef();
    }

    componentDidMount() {
        this.inputField.current.focus();
    }

    handleSubmit = (e) => {
        e.preventDefault();

        this.props.handleSave(this.props.coords, this.state.map_id);
    };

    inputOnChange = (e) => {
        this.setState({ map_id: e.target.value });
    };

    render() {
        const { coords } = this.props;
        const { map_id } = this.state;

        const headerText = coords !== null && coords !== undefined
            ? `X: ${coords.x}, Z: ${coords.z}, zoom: ${coords.zoom}`
            : '';
        return (
            <div id={this.props.popup_id} className="popup">
                <Form onSubmit={this.handleSubmit}>
                    <Form.Row>
                        <Form.Group>{headerText}</Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Form.Row} controlId="map_id">
                            <Form.Label column sm={2}>Map ID</Form.Label>
                            <Col sm={10}>
                                <Form.Control
                                    ref={this.inputField}
                                    name="map_id"
                                    onChange={this.inputOnChange}
                                    value={map_id} />
                            </Col>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Button variant="primary" type="submit">Save</Button>
                    </Form.Row>
                </Form>
            </div>
        );
    }
};