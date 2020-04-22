import React from 'react';

import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class NavigationBar extends React.Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark">
                <Link to= "" className="navbar-brand">
                    <img src="https://cdn.discordapp.com/avatars/174560080149086208/a_75d752f7520ce6f8f6988bfe6a608c74.png?size=128" width="25" height="25" alt="brand" />
                    Ghost Kitchen
                </Link>
                <Nav className="mr-auto">
                    <Link to="add" className="nav-link">Add Recipe</Link>
                    <Link to="list" className="nav-link">Recipe List</Link>
                </Nav>
            </Navbar>
            );
    }
}

export default NavigationBar;