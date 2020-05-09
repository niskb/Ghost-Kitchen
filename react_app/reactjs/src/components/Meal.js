import React, { Component } from 'react';

import { Card, Form, Button, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSave, faPlusSquare, faUndo, faList, faEdit } from '@fortawesome/free-solid-svg-icons'
import MyToast from './MyToast';

export default class Meal extends Component {

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.mealChange = this.mealChange.bind(this);
        this.submitMeal = this.submitMeal.bind(this);
    }

    initialState = {
        id: '', title: '', href: '', ingredients: '', thumbnail: '', price: '', isSuggested: '', isSelected: '', quantity: 0
    };

    componentDidMount() {
        const mealId = +this.props.match.params.id;
        if (mealId) {
            this.findMealById(mealId);
        }
    }

    findMealById = (mealId) => {
        fetch("http://localhost:8080/rest/meals/" + mealId)
            .then(response => response.json())
            .then((meal) => {
                if (meal) {
                    this.setState({
                        id: meal.id,
                        title: meal.title,
                        href: meal.href,
                        ingredients: meal.ingredients,
                        thumbnail: meal.thumbnail,
                        price: meal.price,
                        isSuggested: meal.isSuggested,
                        isSelected: meal.isSelected,
                        quantity: meal.quantity
                    });
                }
            }).catch((error) => {
                console.error("Error - " + error);
            });
    }

    resetMeal = () => {
        this.setState(() => this.initialState);
    };

    updateMeal = event => {
        if (this.state.isSuggested.includes("true")) {
            event.preventDefault();
            const meal = {
                id: this.state.id,
                title: this.state.title,
                href: this.state.href,
                ingredients: this.state.ingredients,
                thumbnail: this.state.thumbnail,
                price: this.state.price,
                isSuggested: "true",
                isSelected: "false",
                quantity: this.state.quantity
            };

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            fetch("http://localhost:8080/rest/meals", {
                method: 'PUT',
                body: JSON.stringify(meal),
                headers
            })
                .then(response => response.json())
                .then((meal) => {
                    if (meal) {
                        this.setState({ "show": true, "method": "put" });
                        setTimeout(() => this.setState({ "show": false }), 3000);
                        setTimeout(() => this.mealList(), 3000);
                    } else {
                        this.setState({ "show": false });
                    }
                });
            this.setState(this.initialState);
        } else {
            alert("You cannot modify the Ghost Kitchen's supplied list of meals!");
        }
    };

    submitMeal = event => {
        event.preventDefault();
        const meal = {
                title: this.state.title,
                href: this.state.href,
                ingredients: this.state.ingredients,
                thumbnail: this.state.thumbnail,
                price: this.state.price,
                isSuggested: "true",
                isSelected: "false",
                quantity: 0
            };

            const headers = new Headers();
            headers.append('Content-Type', 'application/json');

            fetch("http://localhost:8080/rest/meals", {
                method: 'POST',
                body: JSON.stringify(meal),
                headers
            })
            .then(response => response.json())
                .then((meal) => {
                    if (meal) {
                this.setState({ "show": true, "method": "post" });
                setTimeout(() => this.setState({ "show": false }), 3000);
            } else {
                this.setState({ "show": false });
            }
        });
        this.setState(this.initialState);
    };

    mealChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    mealList = () => {
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
                    <Form onReset={this.resetMeal} onSubmit={this.state.id ? this.updateMeal : this.submitMeal} id="mealFormId">
                            <Card.Body>
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridTitle">
                                        <Form.Label>Title</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" name="title" value={title} onChange={this.mealChange} className={"bg-dark text-white"} placeholder="Enter Meal Title" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridHREF">
                                        <Form.Label>HREF</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" name="href" value={href} onChange={this.mealChange} className={"bg-dark text-white"} placeholder="Enter Meal HREF" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPrice">
                                        <Form.Label>Price</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" name="price" value={price} onChange={this.mealChange} className={"bg-dark text-white"} placeholder="Enter Meal Price $" />
                                    </Form.Group>

                                    <Form.Group as={Col} controlId="formGridThumbnail">
                                        <Form.Label>Thumbnail URL</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" name="thumbnail" value={thumbnail} onChange={this.mealChange} className={"bg-dark text-white"} placeholder="Enter Meal Thumbnail" />
                                    </Form.Group>
                                </Form.Row>

                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridIngredients">
                                        <Form.Label>Ingredients</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" name="ingredients" value={ingredients} onChange={this.mealChange} className={"bg-dark text-white"} placeholder="Enter Meal Ingredients" />
                                    </Form.Group>
                                </Form.Row>
                            </Card.Body>
                            <Card.Footer style={{ "textAlign": "right" }}>
                            <Button size="sm" variant="success" type="submit"><FontAwesomeIcon icon={faSave} />{this.state.id ? " Update" : " Save"}
                                </Button>{' '}
                            <Button size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} /> Reset
                                </Button>{' '}
                            <Button size="sm" variant="info" type="button" onClick={this.mealList.bind()}>
                                <FontAwesomeIcon icon={faList} /> Meal List
                                </Button>
                            </Card.Footer>
                        </Form>
                    </Card>
                </div>
        );
    }
}