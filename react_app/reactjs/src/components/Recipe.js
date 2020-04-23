import React, { Component } from 'react';

import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlusSquare, faUndo, faList } from '@fortawesome/free-solid-svg-icons'
import MyToast from './MyToast';
import axios from 'axios';

export default class Recipe extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.recipeChange = this.recipeChange.bind(this);
        this.submitRecipe = this.submitRecipe.bind(this);
    }

    initialState = {
        title: '', href: '', ingredients: '', thumbnail: '', price: ''
    }

    resetRecipe = () => {
        this.setState(() => this.initialState);
    }

    submitRecipe = event => {
        event.preventDefault();
        const recipe = {
            title: this.state.title,
            href: this.state.href,
            ingredients: this.state.ingredients,
            thumbnail: this.state.thumbnail,
            price: this.state.price
        };
        axios.post("http://localhost:8080/rest/recipes", recipe)
            .then(response => {
                if (response.data != null) {
                    this.setState({ "show": true });
                    setTimeout(() => this.setState({ "show": false }), 3000);
                } else {
                    this.setState({ "show": false });
                }
            });
        this.setState(this.initialState);
    }

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
                    <MyToast show={this.state.show} message={"Recipe Saved Successfully."} type={"success"}/>
                </div>
                    <Card className={"border border-dark bg-dark text-white"}>
                        <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Add New Recipe</Card.Header>
                        <Form onReset={this.resetRecipe} onSubmit={this.submitRecipe} id="recipeFormId">
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <Form.Label>Title</Form.Label>
                                        <Form.Control required autoComplete="off" type="text" name="title" value={title} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Recipe Title" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridHREF">
                                        <Form.Label>HREF</Form.Label>
                                        <Form.Control required autoComplete="off" type="text" name="href" value={href} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Recipe HREF" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPrice">
                                        <Form.Label>Price</Form.Label>
                                        <Form.Control required autoComplete="off" type="text" name="price" value={price} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Recipe Price $" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridThumbnail">
                                        <Form.Label>Thumbnail URL</Form.Label>
                                        <Form.Control required autoComplete="off" type="text" name="thumbnail" value={thumbnail} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Recipe Thumbnail" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridIngredients">
                                        <Form.Label>Ingredients</Form.Label>
                                        <Form.Control required autoComplete="off" type="text" name="ingredients" value={ingredients} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Recipe Ingredients" />
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                            <Card.Footer style={{ "textAlign": "right" }}>
                            <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} /> Submit
                                </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                                </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.recipeList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Recipe List
                                </Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>
        );
    }
}