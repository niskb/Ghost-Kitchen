import React, { Component } from 'react';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import AppNavbar from './AppNavbar';
import { Link } from 'react-router-dom';

class RestaurantList extends Component {

  constructor(props) {
    super(props);
      this.state = {restaurants: [], isLoading: true};
    this.remove = this.remove.bind(this);
  }

  componentDidMount() {
    this.setState({isLoading: true});

      fetch('api/restaurants')
      .then(response => response.json())
      .then(data => this.setState({restaurants: data, isLoading: false}));
  }

  async remove(id) {
      await fetch(`/api/restaurant/${id}`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(() => {
        let updatedRestaurants = [...this.state.restaurants].filter(i => i.id !== id);
        this.setState({ restaurants: updatedRestaurants});
    });
  }

  render() {
      const {restaurants, isLoading} = this.state;

    if (isLoading) {
      return <p>Loading...</p>;
    }

      const restaurantList = restaurants.map(restaurant => {
          const address = `${restaurant.address || ''} ${restaurant.city || ''} ${restaurant.stateOrProvince || ''}`;
          return <tr key={restaurant.id}>
        <td style={{whiteSpace: 'nowrap'}}>{restaurant.name}</td>
        <td>{address}</td>
        <td>{restaurant.events.map(event => {
          return <div key={event.id}>{new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'long',
            day: '2-digit'
          }).format(new Date(event.date))}: {event.title}</div>
        })}</td>
        <td>
          <ButtonGroup>
            <Button size="sm" color="primary" tag={Link} to={"/restaurants/" + restaurant.id}>Edit</Button>
            <Button size="sm" color="danger" onClick={() => this.remove(restaurant.id)}>Delete</Button>
          </ButtonGroup>
        </td>
      </tr>
    });

    return (
      <div>
        <AppNavbar/>
        <Container fluid>
          <div className="float-right">
            <Button color="success" tag={Link} to="/restaurants/new">Add Restaurant</Button>
          </div>
          <h3>My Restaurants</h3>
          <Table className="mt-4">
            <thead>
            <tr>
              <th width="20%">Name</th>
              <th width="20%">Location</th>
              <th>Events</th>
              <th width="10%">Actions</th>
            </tr>
            </thead>
            <tbody>
            {restaurantList}
            </tbody>
          </Table>
        </Container>
      </div>
    );
  }
}

export default RestaurantList;