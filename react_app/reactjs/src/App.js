import React from 'react';
import './App.css';

import { Container, Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import NavigationBar from './components/NavigationBar';
import Welcome from './components/Welcome';
import Recipe from './components/Recipe';
import RecipeList from './components/RecipeList';
import Footer from './components/Footer';

function App() {
    const marginTop = {
        marginTop: "20px"
    };

  return (
      <Router>
          <NavigationBar />
          <Container>
              <Row>
                  <Col lg={12} style={marginTop}>
                      <Switch>
                          <Route path="/" exact component={Welcome} />
                          <Route path="/add" exact component={Recipe} />
                          <Route path="/list" exact component={RecipeList} />
                      </Switch>
                  </Col>
              </Row>
          </Container>
          <Footer />
      </Router>
  );
}

export default App;
