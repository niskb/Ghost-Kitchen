import React from 'react';
import './App.css';

import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Meal from './components/Meal';
import MealList from './components/MealList';
import UserList from './components/UserList';
import MealOrder from './components/MealOrder';
import Checkout from './components/Checkout';

export default function App() {
  return (
      <Router>
          <NavigationBar />
          <Container>
              <Row>
                  <Col lg={12} className={"marginTop"}>
                      <Switch>
                          <Route path="/" exact component={Welcome} />
                          <Route path="/add" exact component={Meal} />
                          <Route path="/edit/:id" exact component={Meal} />
                          <Route path="/list" exact component={MealList} />
                          <Route path="/users" exact component={UserList} />
                          <Route path="/order" exact component={MealOrder} />
                          <Route path="/checkout" exact component={Checkout} />
                      </Switch>
                  </Col>
              </Row>
          </Container>
      </Router>
  );
}