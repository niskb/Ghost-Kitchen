import React, { Component } from 'react';

import { Card, Table, Nav, NavItem, NavLink, Image, Button, ButtonGroup, InputGroup, FormControl } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPizzaSlice, faFastBackward, faStepBackward, faStepForward, faFastForward, faSearch, faTimes, faClipboardCheck, faShoppingCart, faBurn, faLink } from '@fortawesome/free-solid-svg-icons'
import MyToast from './MyToast';
import './Style.css';
import axios from 'axios';

export default class MealOrder extends Component {

    constructor(props) {
        super(props);

        this.state = {
            meals: [],
            search: '',
            currentPage: 1,
            mealsPerPage: 5,
            total: 0.00
        };
    }

    componentDidMount() {
        this.findAllMeals();
    }

    findAllMeals() {
        fetch("http://localhost:8080/rest/meals")
            .then(response => response.json())
            .then((data) => {
                const filteredMeals = data.filter(meal => meal.isSuggested.includes("false"));
                this.setState({ meals: filteredMeals });
                this.calculateTotal();
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

    cancelSearch = () => {
        this.setState({ "search": '' });
        this.findAllMeals(this.state.currentPage);
    };

    searchData = (currentPage) => {
        this.setState({ currentPage: 1 })
        axios.get("http://localhost:8080/rest/meals")
            .then(response => response.data)
            .then((data) => {
                const filteredMeals = data.filter(meal => meal.ingredients.toLowerCase().includes(this.state.search.toLowerCase()));
                this.setState({ meals: filteredMeals });
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
        this.mealOrder();
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
        this.mealOrder();
    };

    mealOrder = () => {
        return window.location.reload();
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
        this.mealOrder();
    };

    render() {
        const { meals, currentPage, mealsPerPage, search } = this.state
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
                            <FontAwesomeIcon icon={faPizzaSlice} /> Order Meals
                        </div>
                        <div style={{ "float": "right" }}>
                            <InputGroup size="sm">
                                <FormControl placeHolder="Search By Ingredient" name="search" value={search} className={"info-border bg-dark text-white"}
                                    onChange={this.searchChange} />
                                <InputGroup.Append>
                                    <Button size="sm" variant="outline-info" type="button" onClick={this.searchData}>
                                        <FontAwesomeIcon icon={faSearch} />
                                    </Button>
                                    <Button size="sm" variant="outline-danger" type="button" onClick={this.cancelSearch}>
                                        <FontAwesomeIcon icon={faTimes} />
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
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
                                    <td colSpan="8">{this.state.meals.length} Meals Available</td> :
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
                                            <td>{meal.ingredients}</td>
                                            <td><Image src={meal.thumbnail} thumbnail width="76" height="76" /></td>
                                            <td>{meal.price}</td>
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
                    <Card.Header>
                        <div style={{ "float": "left" }}>
                            Total: ${this.state.total}
                        </div>
                    </Card.Header>
                    <Card.Footer>
                        <div style={{ "float": "left" }}>
                            <Button type="button" variant="outline-danger"
                                onClick={() => this.resetOrder()}>
                                <FontAwesomeIcon icon={faBurn} /> Reset
                            </Button>
                        </div>
                        <div style={{ "float": "right" }}>
                            <Button type="button" variant="outline-warning">
                                <Link to="checkout" className="nav-link">
                                    <FontAwesomeIcon icon={faShoppingCart} /> Go to Checkout
                                </Link>
                            </Button>
                        </div>
                    </Card.Footer>
                </Card>
            </div>
        );
    }
}
