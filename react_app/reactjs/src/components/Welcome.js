import React, { Component } from 'react';

import { Jumbotron } from 'react-bootstrap';

export default class Welcome extends Component {
    render() {
        return (
            <Jumbotron className="bg-dark text-white">
                <h1>Welcome to the Ghost Kitchen!</h1>
                <blockquote className="blockquote mb-0">
                    <p>
                        Ghost Kitchen project using Spring Boot and React!
                    </p>
                    <footer className="blockquote-footer">
                        Brian Niski
                    </footer>
                </blockquote>
            </Jumbotron>
        );
    }
}