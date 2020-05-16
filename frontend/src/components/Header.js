import React, { Component } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';

export default class Header extends Component {
    render() {
        const user = this.props.authentication.get('user')
        const logged_in = this.props.authentication.get('user') !== null;

        let auth = null;
        if (user !== null) {
            auth = (
                <Navbar.Text>
                    Logged in as {user.get('username')}
                    {' '}
                    <Button variant="outline-light" onClick={this.props.handleLogout}>Logout</Button>
                </Navbar.Text>
            );
        } else {
            auth = <Button variant="outline-light" onClick={this.props.handleLogin}>Login</Button>;
        }

        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Minemap</Navbar.Brand>
                <Nav className="mr-auto"></Nav>
                {auth}
            </Navbar>
        );
    }
}