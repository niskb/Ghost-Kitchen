import React, { Component } from 'react';

import { Jumbotron, Image } from 'react-bootstrap';
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
                <td colSpan="3">
                    <td><Image src="https://cdn.discordapp.com/attachments/190278775202775040/708826641849253918/SNICKER_DOODLE.png" width="370" height="370" /></td>
                    <td><Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgNZ0B0oxAKMmM3cttlOl2Kg7jvIR0cf29sHVwXbqmqZJd-cX4yw&s" roundedCircle width="370" height="370" alt="brand" /></td>
                    <td><Image src="https://cdn.discordapp.com/attachments/190278775202775040/708826641849253918/SNICKER_DOODLE.png" width="370" height="370" /></td>
                </td>
                <Footer></Footer>
            </div>
        );
    }
}