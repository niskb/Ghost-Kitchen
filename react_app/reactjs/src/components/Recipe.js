import React, { Component } from 'react';

import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlusSquare } from '@fortawesome/free-solid-svg-icons'

export default class Recipe extends Component {

    constructor(props) {
        super(props);
        this.state = { title: '', href: '', ingredients: '', thumbnail: '', price: '' };
        this.recipeChange = this.recipeChange.bind(this);
        this.submitRecipe = this.submitRecipe.bind(this);
    }

    submitRecipe(event) {
        alert("Add New Recipe:\nTitle: " + this.state.title + " HREF: " + this.state.href + " Ingredients: " + this.state.ingredients + " Thumbnail: " + this.state.thumbnail + " Price: $" + this.state.price);
        event.preventDefault();
    }

    recipeChange(event) {
        this.setState({
            [event.target.name]:event.target.value
        });
    }

    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Add New Recipe</Card.Header>
                <Form onSubmit={this.submitRecipe} id="recipeFormId">
                    <Card.Body>
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control required type="text" name="title" value={this.state.title} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Recipe Title" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridHREF">
                                <Form.Label>HREF</Form.Label>
                                <Form.Control required type="text" name="href" value={this.state.href} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Recipe HREF" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control required type="text" name="price" value={this.state.price} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Recipe Price $" />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridThumbnail">
                                <Form.Label>Thumbnail URL</Form.Label>
                                <Form.Control required type="text" name="thumbnail" value={this.state.thumbnail} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Recipe Thumbnail" />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridIngredients">
                                <Form.Label>Ingredients</Form.Label>
                                <Form.Control required type="text" name="ingredients" value={this.state.ingredients} onChange={this.recipeChange} className={"bg-dark text-white"} placeholder="Enter Recipe Ingredients" />
                            </Form.Group>
                        </Form.Row>
                </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} /> Submit</Button>
                    </Card.Footer>
                </Form>
            </Card>

        );
    }
}