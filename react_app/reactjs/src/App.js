import React from 'react';
import './App.css';

import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';
import UserList from './components/UserList';
import Footer from './components/Footer';

export default function App() {
    const marginTop = {
        marginTop: "20px"
    };

    const heading = "Welcome to the Ghost Kitchen!";
    const desc = "Ghost Kitchen project using Spring Boot and React!";
    const name = "Brian Niski";

  return (
      <Router>
          <NavigationBar />
          <Container>
              <Row>
                  <Col lg={12} style={marginTop}>
                      <Switch>
                          <Route path="/" exact component={() => <Welcome heading={heading} desc={desc} name={name}/>} />
                          <Route path="/add" exact component={Recipe} />
                          <Route path="/edit/:id" exact component={Recipe} />
                          <Route path="/list" exact component={RecipeList} />
                          <Route path="/users" exact component={UserList} />
                      </Switch>
                  </Col>
              </Row>
          </Container>
          <Footer />
      </Router>
  );
}