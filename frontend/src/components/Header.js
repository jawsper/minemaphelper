import React, { Component } from 'react';
import { Navbar, Nav, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons/faGithub';
import WorldSelection from './WorldSelection';

class Header extends React.Component {
    onSearchSubmit = e => {
        e.preventDefault();
        e.stopPropagation();
        this.props.handleSearch(e.target['query'].value);
    }

    render() {
        const user = this.props.authentication.get('user')

        let auth = null;
        if (user !== null && !user.get('anonymous')) {
            auth = [
                <Navbar.Text key={0}>
                    Logged in as {user.get('username')}
                    {' '}
                </Navbar.Text>,
                <Button key={1} className="ml-sm-2" variant="outline-light" onClick={this.props.handleLogout}>Logout</Button>
            ];
        } else {
            auth = <Button variant="outline-light" onClick={this.props.handleLogin}>Login</Button>;
        }

        return (
            <Navbar bg="dark" variant="dark">
                <Navbar.Brand>Minemap</Navbar.Brand>
                <Nav className="mr-auto" />
                {/* <Form inline className="mr-sm-2" onSubmit={this.onSearchSubmit}>
                    <Form.Control name="query" type="text" placeholder="Search" className="mr-sm-2" />
                    <Button type="submit">Search</Button>
                </Form> */}
                <Nav className="mr-auto" />
                <WorldSelection
                    className="mr-sm-2"
                    current_world={this.props.current_world}
                    worlds={this.props.worlds}
                    onSelectWorld={this.props.onSelectWorld} />
                {auth}
                <Nav.Link
                    href="https://github.com/jawsper/minemaphelper"
                    target="_blank"
                    rel="noopener noreferrer">
                    <FontAwesomeIcon icon={faGithub} size="lg" />
                </Nav.Link>
            </Navbar>
        );
    }
}

export default Header;