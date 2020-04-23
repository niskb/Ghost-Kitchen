import React, { Component } from 'react';

import { Card, Table, Nav, NavItem, NavLink, Image, Button, ButtonGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios';

export default class RecipeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipes : []
        };
    }

    componentDidMount() {
        this.findAllRecipes();
    }

    findAllRecipes() {
        axios.get("http://localhost:8080/rest/recipes")
            .then(response => response.data)
            .then((data) => {
                this.setState({ recipes: data });
            });
    }

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> Recipe List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>HREF</th>
                                <th>Ingredients</th>
                                <th>Thumbnail</th>
                                <th>Price ($)</th>
                                <th>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                                {
                                    this.state.recipes.length === 0 ?
                                        <td colSpan="7">{this.state.recipes.length} Recipes Available</td> :
                                        this.state.recipes.map((recipe) => (
                                            <tr key={recipe.id}>
                                                <td>{recipe.id}</td>
                                                <td>{recipe.title}</td>
                                                <td>
                                                    <Nav className="ml-auto" navbar>
                                                        <Button variant="link" size="sm">
                                                            <NavItem>
                                                                Link
                                                                <NavLink href={recipe.href}></NavLink>
                                                            </NavItem>
                                                        </Button>
                                                    </Nav>
                                                </td>
                                                <td>{recipe.ingredients}</td>
                                                <td>
                                                    <Image src={recipe.thumbnail} roundedCircle width="76" height="76" />
                                                </td>
                                                <td>{recipe.price}</td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Button variant="warning">
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Button>
                                                        <Button variant="danger">
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </Button>
                                                    </ButtonGroup>
                                                </td>
                                            </tr>
                                        ))
                                }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            );
    }

}
