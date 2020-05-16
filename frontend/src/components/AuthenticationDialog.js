import React, { Component } from 'react';

import { Modal, Form, Button, Alert } from 'react-bootstrap';

export default class AuthenticationDialog extends Component {
    state = {
        validated: false,
    }

    constructor(props) {
        super(props);
        this.defaultInput = React.createRef();
    }

    componentDidMount() {
        this.defaultInput.current.focus();
    }

    handleSubmit = e => {
        const form = e.currentTarget;
        if (form.checkValidity() === false) {
            e.preventDefault();
            e.stopPropagation();
        }

        this.setState({ validated: true });
        e.preventDefault();
        console.log(e);
        this.props.doAuthenticate(e.target['username'].value, e.target['password'].value)
    }

    render() {
        const errors = this.props.authentication.get('errors');
        if (errors.size > 0) console.log('errors', errors);

        let error_box = null;
        if (errors.get('non_field_errors')) {
            if (this.state.validated) this.setState({ validated: false })
            error_box = errors.get('non_field_errors').map(
                (error, key) => <Alert key={key} variant="warning">{error}</Alert>
            )
        }

        return (
            <Modal show={true} centered onHide={this.props.doClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Authentication required</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {error_box}
                    <Form
                        noValidate
                        validated={this.state.validated}
                        onSubmit={this.handleSubmit}>
                        <Form.Group controlId="formBasicUsername">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                ref={this.defaultInput}
                                required
                                name="username" type="text" placeholder="Enter username" />
                            <Form.Control.Feedback type="invalid">
                                Please enter your username.
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                required
                                name="password" type="password" placeholder="Password" />
                            <Form.Control.Feedback type="invalid">
                                Please enter your password.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
}
