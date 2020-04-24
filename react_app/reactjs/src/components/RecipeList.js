import React, { Component } from 'react';

import { Card, Table, Nav, NavItem, NavLink, Image, Button, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList, faEdit, faTrash, faFastBackward, faStepBackward, faStepForward, faFastForward } from '@fortawesome/free-solid-svg-icons'
import MyToast from './MyToast';
import axios from 'axios';

export default class RecipeList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            currentPage: 1,
            recipesPerPage: 10
        };
    }

    componentDidMount() {
        this.findAllRecipes();
    }

    findAllRecipes() {
        fetch("http://localhost:8080/rest/recipes")
            .then(response => response.json())
            .then((data) => {
                this.setState({ recipes: data });
            });
    }

    /*deleteRecipe = (recipeId) => {
        fetch("http://localhost:8080/rest/recipes/" + recipeId, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then((recipe) => {
            if (recipe) {
                this.setState({ "show": true });
                setTimeout(() => this.setState({ "show": false }), 3000);
                this.setState({
                    recipes: this.state.recipes.filter(recipe => recipe.id !== recipeId)
                });
            } else {
                this.setState({ "show": false });
            }
        });
    };*/

    deleteRecipe = (recipeId) => {
        axios.delete("http://localhost:8080/rest/recipes/" + recipeId)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                    this.setState({
                        recipes: this.state.recipes.filter(recipe => recipe.id !== recipeId)
                    });
                } else {
                    this.setState({ "show": false });
                }
            });
    };

    changePage = event => {
        this.setState({
            [event.target.name]: parseInt(event.target.value)
        });
    };

    firstPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: 1
            });
        }
    };

    prevPage = () => {
        if (this.state.currentPage > 1) {
            this.setState({
                currentPage: this.state.currentPage - 1
            });
        }
    };

    lastPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.recipes.length / this.state.recipesPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.recipes.length / this.state.recipesPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.recipes.length / this.state.recipesPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    render() {
        const { recipes, currentPage, recipesPerPage } = this.state
        const lastIndex = currentPage * recipesPerPage;
        const firstIndex = lastIndex - recipesPerPage;
        const currentRecipes = recipes.slice(firstIndex, lastIndex);
        const totalPages = recipes.length / recipesPerPage;

        const pageNumCss = {
            width: "45px",
            border: "1px solid #17A2B8",
            color: "#17A2B8",
            textAlign: "center",
            fontWeight: "bold"
        };

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={"Recipe Deleted Successfully."} type={"danger"} />
                </div>
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
                                    {this.state.recipes.length === 0 ?
                                        <td colSpan="7">{this.state.recipes.length} Recipes Available</td> :
                                        currentRecipes.map((recipe) => (
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
                                                <td>
                                                    {recipe.ingredients}
                                                </td>
                                                <td>
                                                    <Image src={recipe.thumbnail} roundedCircle width="76" height="76" />
                                                </td>
                                                <td>
                                                    {recipe.price}
                                                </td>
                                                <td>
                                                    <ButtonGroup>
                                                        <Link to={"edit/" + recipe.id} className="btn btn-warning"><FontAwesomeIcon icon={faEdit} /></Link>{' '}
                                                        <Button variant="danger" onClick={this.deleteRecipe.bind(this, recipe.id)}>
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
                    <Card.Footer>
                        <div style={{ "float": "left" }}>
                            Showing Page {currentPage} out of {totalPages}
                        </div>
                        <div style={{ "float": "right" }}>
                            <InputGroup size="sm">
                                <InputGroup.Prepend>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.firstPage}>
                                        <FontAwesomeIcon icon={faFastBackward} /> First
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === 1 ? true : false}
                                        onClick={this.prevPage}>
                                        <FontAwesomeIcon icon={faStepBackward} /> Prev
                                    </Button>
                                </InputGroup.Prepend>
                                <FormControl style={pageNumCss} className={"bg-dark"} name="currentPage" value={currentPage}
                                    onChange={this.changePage} />
                                <InputGroup.Append>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                        onClick={this.nextPage}>
                                        <FontAwesomeIcon icon={faStepForward} /> Next
                                    </Button>
                                    <Button type="button" variant="outline-info" disabled={currentPage === totalPages ? true : false}
                                        onClick={this.lastPage}>
                                        <FontAwesomeIcon icon={faFastForward} /> Last
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                        </div>
                    </Card.Footer>
                    </Card>
                </div>
            );
    }

}
