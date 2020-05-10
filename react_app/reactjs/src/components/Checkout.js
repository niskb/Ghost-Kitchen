import React, { Component } from 'react';

import { Card, Table, Nav, NavItem, NavLink, Image, Button, ButtonGroup, InputGroup, FormControl, Form, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFastBackward, faStepBackward, faStepForward, faFastForward, faClipboardCheck, faShoppingCart, faBurn, faDollarSign, faLink, faPizzaSlice } from '@fortawesome/free-solid-svg-icons'
import MyToast from './MyToast';
import './Style.css';
import axios from 'axios';

export default class Checkout extends Component {

    constructor(props) {
        super(props);

        this.state = {
            meals: [],
            currentPage: 1,
            mealsPerPage: 5,
            total: 0.00,
            name: "",
            email: "",
            address: "",
            phoneNumber: ""
        };
    }

    componentDidMount() {
        this.findAllMeals();
    }

    findAllMeals() {
        fetch("http://localhost:8080/rest/meals")
            .then(response => response.json())
            .then((data) => {
                const filteredMeals = data.filter(meal => (meal.isSelected.includes("true") && meal.quantity > 0));
                this.setState({ meals: filteredMeals });
                if (this.state.meals.length === 0) {
                    this.mealOrder();
                } else {
                    this.calculateTotal();
                }
            });
    }

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
        if (this.state.currentPage < Math.ceil(this.state.meals.length / this.state.mealsPerPage)) {
            this.setState({
                currentPage: Math.ceil(this.state.meals.length / this.state.mealsPerPage)
            });
        }
    };

    nextPage = () => {
        if (this.state.currentPage < Math.ceil(this.state.meals.length / this.state.mealsPerPage)) {
            this.setState({
                currentPage: this.state.currentPage + 1
            });
        }
    };

    searchChange = event => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    addMealToOrder = (meal) => {
        const changedMeal = {
            id: meal.id,
            title: meal.title,
            href: meal.href,
            ingredients: meal.ingredients,
            thumbnail: meal.thumbnail,
            price: meal.price,
            isSuggested: meal.isSuggested,
            isSelected: "true",
            quantity: (meal.quantity + 1)
        };
        axios.put("http://localhost:8080/rest/meals", changedMeal);
        window.location.reload();
    };

    removeMealToOrder = (meal) => {
        if (meal.quantity === 1) {
            const changedMeal = {
                id: meal.id,
                title: meal.title,
                href: meal.href,
                ingredients: meal.ingredients,
                thumbnail: meal.thumbnail,
                price: meal.price,
                isSuggested: meal.isSuggested,
                isSelected: "false",
                quantity: (meal.quantity - 1)
            };
            axios.put("http://localhost:8080/rest/meals", changedMeal);
        } else if (meal.quantity > 0) {
            const changedMeal = {
                id: meal.id,
                title: meal.title,
                href: meal.href,
                ingredients: meal.ingredients,
                thumbnail: meal.thumbnail,
                price: meal.price,
                isSuggested: meal.isSuggested,
                isSelected: "true",
                quantity: (meal.quantity - 1)
            };
            axios.put("http://localhost:8080/rest/meals", changedMeal);
        }
        window.location.reload();
    };

    mealOrder = () => {
        return this.props.history.push("/order");
    };

    calculateTotal = () => {
        fetch("http://localhost:8080/rest/meals")
            .then(response => response.json())
            .then((data) => {
                const filteredMeals = data.filter(meal => meal.quantity > 0);
                for (var i = 0; i < filteredMeals.length; i++) {
                    this.setState({ total: (this.state.total + (filteredMeals[i].quantity * filteredMeals[i].price)) });
                }
            });
    }

    resetOrder = () => {
        for (var i = 0; i < this.state.meals.length; i++) {
            const changedMeal = {
                id: this.state.meals[i].id,
                title: this.state.meals[i].title,
                href: this.state.meals[i].href,
                ingredients: this.state.meals[i].ingredients,
                thumbnail: this.state.meals[i].thumbnail,
                price: this.state.meals[i].price,
                isSuggested: this.state.meals[i].isSuggested,
                isSelected: "false",
                quantity: 0
            };
            axios.put("http://localhost:8080/rest/meals", changedMeal);
        }
        window.location.reload();
    };

    formNameChange = event => {
        this.setState({
            name: event.target.value
        });
    };

    formEmailChange = event => {
        this.setState({
            email: event.target.value
        });
    };

    formAddressChange = event => {
        this.setState({
            address: event.target.value
        });
    };

    formPhoneNumberChange = event => {
        this.setState({
            phoneNumber: event.target.value
        });
    };

    makePayment = () => {
        if (!(this.state.name.length === 0 || this.state.email.length === 0 || this.state.address.length === 0 || this.state.phoneNumber.length === 0)) {
            var mealsStringVar = "";
            for (var i = 0; i < this.state.meals.length; i++) {
                mealsStringVar += "\nMeal [Id: " + this.state.meals[i].id + "; Title: " + this.state.meals[i].title + "; Price: $" + this.state.meals[i].price + "; Quantity: " + this.state.meals[i].quantity + "]"
            }
            const history = {
                meals: mealsStringVar,
                total: this.state.total,
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                phoneNumber: this.state.phoneNumber
            };
            axios.post("http://localhost:8080/rest/history", history);
            this.resetOrder();
        } else {
            alert("Please fill out the needed information, or your order will not be sent!");
        }
    };

    render() {
        const { meals, currentPage, mealsPerPage } = this.state
        const lastIndex = currentPage * mealsPerPage;
        const firstIndex = lastIndex - mealsPerPage;
        const currentMeals = meals.slice(firstIndex, lastIndex);
        const totalPages = Math.ceil(meals.length / mealsPerPage);

        return (
            <div>
                <div style={{ "display": this.state.show ? "block" : "none" }}>
                    <MyToast show={this.state.show} message={"Meal Deleted Successfully."} type={"danger"} />
                </div>
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <div style={{ "float": "left" }}>
                            <FontAwesomeIcon icon={faShoppingCart} /> Checkout
                        </div>
                        <div style={{ "float": "right" }}>
                            <Button size="sm" variant="outline-light" type="button" onClick={() => this.mealOrder()}>
                                <FontAwesomeIcon icon={faPizzaSlice} /> Back to Order Meals
                            </Button>    
                        </div>
                    </Card.Header>
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
                                    <th>Select Meal</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.meals.length === 0 ?
                                    <td colSpan="8">{this.state.meals.length} Meals in Order</td> :
                                    currentMeals.map((meal) => (
                                        <tr key={meal.id}>
                                            <td>{meal.id}</td>
                                            <td>{meal.title}</td>
                                            <td>
                                                <Nav className="ml-auto" navbar>
                                                    <Button variant="link" size="sm">
                                                        <NavItem><NavLink href={meal.href}><FontAwesomeIcon icon={faLink} /> External Link</NavLink></NavItem>
                                                    </Button>
                                                </Nav>
                                            </td>
                                            <td>
                                                {meal.ingredients}
                                            </td>
                                            <td>
                                                <Image src={meal.thumbnail} thumbnail width="76" height="76" />
                                            </td>
                                            <td>
                                                {meal.price}
                                            </td>
                                            <td>
                                                <ButtonGroup>
                                                    <Button type="button" variant="outline-success"
                                                        onClick={() => this.addMealToOrder(meal)}>
                                                        <FontAwesomeIcon icon={faClipboardCheck} /> Add
                                                    </Button>
                                                    <Button type="button" variant="outline-danger"
                                                        onClick={() => this.removeMealToOrder(meal)}>
                                                        <FontAwesomeIcon icon={faBurn} /> Remove
                                                    </Button>
                                                </ButtonGroup>
                                            </td>
                                            <td>{meal.quantity}</td>
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
                                <FormControl className={"page-num bg-dark"} name="currentPage" value={currentPage}
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
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Footer>
                        <div style={{ "float": "left" }}>
                            Total: ${this.state.total}
                        </div>
                    </Card.Footer>
                    <Card.Footer>
                        <div style={{ "float": "left" }}>
                            Please give us some of your information so we know who you are and where to send your order to:
                        </div>
                        <div style={{ "float": "left" }}>
                            We will contact you back "SOON" to ensure that you're not pranking us.
                        </div>
                        <div style={{ "float": "left" }}>
                            We will be needing your credit/debit card number as "SOON" as we get back to you.
                        </div>
                    </Card.Footer>
                    <Form>
                        <Card.Body>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={this.formNameChange} className={"bg-dark text-white"} placeholder="Enter Name" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={this.formEmailChange} className={"bg-dark text-white"} placeholder="Enter Email" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Shipping Address</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={this.formAddressChange} className={"bg-dark text-white"} placeholder="Enter Shipping Address" />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Label>Phone Number</Form.Label>
                                    <Form.Control required autoComplete="off" type="text" onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }} onChange={this.formPhoneNumberChange} className={"bg-dark text-white"} placeholder="Enter Phone Number" />
                                </Form.Group>
                            </Form.Row>
                        </Card.Body>
                    </Form>
                    <Card.Footer>
                        <div style={{ "float": "left" }}>
                            <Button type="button" variant="outline-danger"
                                onClick={() => this.resetOrder()}>
                                <FontAwesomeIcon icon={faBurn} /> Reset
                            </Button>
                        </div>
                        <div style={{ "float": "right" }}>
                            <Button type="button" variant="outline-warning"
                                onClick={() => this.makePayment()}>
                                <FontAwesomeIcon icon={faDollarSign} /> Make Payment
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
