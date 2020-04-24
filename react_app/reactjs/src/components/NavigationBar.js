import React from 'react';

import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Link to="" className="navbar-brand"><Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgNZ0B0oxAKMmM3cttlOl2Kg7jvIR0cf29sHVwXbqmqZJd-cX4yw&s" roundedCircle width="76" height="76" alt="brand" /> Home</Link>
            <Nav className="mr-auto">
                <Link to="add" className="nav-link">Add Suggested Meal</Link>
                <Link to="list" className="nav-link">Meal List</Link>
                <Link to="users" className="nav-link">User List</Link>
            </Nav>
        </Navbar>
        );
}