import React from 'react';

import { Navbar, Nav, Image, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRecycle } from '@fortawesome/free-solid-svg-icons'

export default function NavigationBar() {

    return (
        <Navbar bg="dark" variant="dark">
            <Link to="" className="navbar-brand"><Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQgNZ0B0oxAKMmM3cttlOl2Kg7jvIR0cf29sHVwXbqmqZJd-cX4yw&s" roundedCircle width="76" height="76" alt="brand" /> Home</Link>
            <Nav className="mr-auto">
                <Link to="add" className="nav-link">Add A Meal Suggestion</Link>
                <Link to="list" className="nav-link">Meal List</Link>
                <Link to="users" className="nav-link">User List</Link>
                <Link to="order" className="nav-link">Order Meals</Link>
            </Nav>
            <Button type="button" variant="outline-info"
                onClick={() => window.location.reload()}>
                <FontAwesomeIcon icon={faRecycle} /> Refresh Page
            </Button>
        </Navbar>
    );

}