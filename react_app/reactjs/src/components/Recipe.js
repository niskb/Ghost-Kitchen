import React, { Component } from 'react';

import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons'
import MyToast from './MyToast';

export default class Recipe extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.recipeChange = this.recipeChange.bind(this);
        this.submitRecipe = this.submitRecipe.bind(this);
    }

    initialState = {
        id: '', title: '', href: '', ingredients: '', thumbnail: '', price: '', isSuggested: ''
    };

    componentDidMount() {
        const recipeId = +this.props.match.params.id;
        if (recipeId) {
            this.findRecipeById(recipeId);
        }
    }

    findRecipeById = (recipeId) => {
        fetch("http://localhost:8080/rest/recipes/" + recipeId)
            .then(response => response.json())
            .then((recipe) => {
                if (recipe) {
                    this.setState({
                        id: recipe.id,
                        title: recipe.title,
                        href: recipe.href,
                        ingredients: recipe.ingredients,
                        thumbnail: recipe.thumbnail,
                        price: recipe.price,
                        isSuggested: recipe.isSuggested
                    });
                }
            }).catch((error) => {
                console.error("Error - " + error);
            });
    }

    resetRecipe = () => {
        this.setState(() => this.initialState);
    };

    updateRecipe = event => {
        if (this.state.isSuggested.includes("true")) {
            event.preventDefault();
            const recipe = {
                id: this.state.id,
                title: this.state.title,
                href: this.state.href,
                ingredients: this.state.ingredients,
                thumbnail: this.state.thumbnail,
                price: this.state.price,
                isSuggested: "true"
            };

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            fetch("http://localhost:8080/rest/recipes", {
                method: 'PUT',
                body: JSON.stringify(recipe),
                headers
            })
                .then(response => response.json())
                .then((recipe) => {
                    if (recipe) {
                        this.setState({ "show": true, "method": "put" });
                        setTimeout(() => this.setState({ "show": false }), 3000);
                        setTimeout(() => this.recipeList(), 3000);
                    } else {
                        this.setState({ "show": false });
                    }
                });
            this.setState(this.initialState);
        } else {
            alert("You cannot modify the Ghost Kitchen's supplied list of meals!");
        }
    };

    submitRecipe = event => {
        event.preventDefault();
            const recipe = {
                title: this.state.title,
                href: this.state.href,
                ingredients: this.state.ingredients,
                thumbnail: this.state.thumbnail,
                price: this.state.price,
                isSuggested: "true"
            };

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            fetch("http://localhost:8080/rest/recipes", {
                method: 'POST',
                body: JSON.stringify(recipe),
                headers
            })
            .then(response => response.json())
            .then((recipe) => {
                if (recipe) {
                this.setState({ "show": true, "method": "post" });
                setTimeout(() => this.setState({ "show": false }), 3000);
            } else {
                this.setState({ "show": false });
            }
        });
        this.setState(this.initialState);
    };

    recipeChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    recipeList = () => {
        return this.props.history.push("/list");
    };

    render() {
        const { title, href, ingredients, thumbnail, price } = this.state;
        return (
            <div>
                <div style={{"display":this.state.show ? "block" : "none"}}>
                    <MyToast show={this.state.show} message={this.state.method === "put" ? "Meal Updated Successfully." : "Meal Saved Successfully."} type={"success"}/>
                </div>
                    <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header><FontAwesomeIcon icon={this.state.id ? faEdit : faPlusSquare } />{this.state.id ? " Update Meal" : " Suggest New Meal"}</Card.Header>
                    <Form onReset={this.resetRecipe} onSubmit={this.state.id ? this.updateRecipe : this.submitRecipe} id="recipeFormId">
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control required autoComplete="off" type="text" name="title" value={title} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Meal Title" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridHREF">
                                        <Form.Label>HREF</Form.Label>
                                        <Form.Control required autoComplete="off" type="text" name="href" value={href} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Meal HREF" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control required autoComplete="off" type="text" name="price" value={price} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Meal Price $" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridThumbnail">
                                        <Form.Label>Thumbnail URL</Form.Label>
                                        <Form.Control required autoComplete="off" type="text" name="thumbnail" value={thumbnail} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Meal Thumbnail" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridIngredients">
                                        <Form.Label>Ingredients</Form.Label>
                                        <Form.Control required autoComplete="off" type="text" name="ingredients" value={ingredients} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Meal Ingredients" />
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                            <Card.Footer style={{ "textAlign": "right" }}>
                            <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} />{this.state.id ? " Update" : " Save"}
                                </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                                </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.recipeList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Meal List
                                </Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>
        );
    }
}