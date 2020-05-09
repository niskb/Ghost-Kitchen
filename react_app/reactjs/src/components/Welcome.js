import React, { Component } from 'react';

import { Jumbotron } from 'react-bootstrap';
import Footer from './Footer';

export default class Welcome extends Component {
    render() {
        return (
            <div>
                <Jumbotron className="bg-dark text-white">
                    <h1>Welcome to my Ghost Kitchen project!</h1>
                    <blockquote className="blockquote mb-0">
                        <p>Ghost Kitchen project using React and Spring Boot!</p>
                        <footer className="blockquote-footer">Brian Niski</footer>
                    </blockquote>
                </Jumbotron>
                <Footer></Footer>
            </div>
        );
    }
}