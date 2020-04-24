import React from 'react';

import { Jumbotron } from 'react-bootstrap';

export default function Welcome(props) {
    return (
        <Jumbotron className="bg-dark text-white">
            <h1>{props.heading}</h1>
            <blockquote className="blockquote mb-0">
                <p>{props.desc}</p>
                <footer className="blockquote-footer">{props.name}</footer>
            </blockquote>
        </Jumbotron>
        );
}