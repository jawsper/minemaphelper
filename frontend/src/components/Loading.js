import React from 'react';
import { Jumbotron, Spinner } from 'react-bootstrap';

const Loading = (props) => {
    if (props.until === false) {
        return (
            <Jumbotron>
                <h1><Spinner animation="border" /></h1>
                <p>{props.message || 'Loading'}</p>
            </Jumbotron>
        );
    }
    return props.children;
};
export default Loading;