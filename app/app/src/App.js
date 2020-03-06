import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import RestaurantList from './RestaurantList';
import RestaurantEdit from './RestaurantEdit';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/' exact={true} component={Home} />
                    <Route path='/restaurants' exact={true} component={RestaurantList} />
                    <Route path='/restaurants/:id' component={RestaurantEdit} />
                </Switch>
            </Router>
        )
    }
}

export default App;