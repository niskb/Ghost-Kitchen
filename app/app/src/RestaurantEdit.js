import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import AppNavbar from './AppNavbar';

class RestaurantEdit extends Component {

    emptyItem = {
        name: '',
        address: '',
        city: '',
        stateOrProvince: '',
        country: '',
        postalCode: '',
        phoneNumber: ''
    };

    constructor(props) {
        super(props);
        this.state = {
            item: this.emptyItem
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
        if (this.props.match.params.id !== 'new') {
            const restaurant = await (await fetch(`/api/restaurant/${this.props.match.params.id}`)).json();
            this.setState({ item: restaurant });
        }
    }

    handleChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        let item = { ...this.state.item };
        item[name] = value;
        this.setState({ item });
    }

    async handleSubmit(event) {
        event.preventDefault();
        const { item } = this.state;

        await fetch('/api/restaurant', {
            method: (item.id) ? 'POST' : 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(item),
        });
        this.props.history.push('/restaurants');
    }

    render() {
        const { item } = this.state;
        const title = <h2>{item.id ? 'Edit Restaurant' : 'Add Restaurant'}</h2>;

        return <div>
            <AppNavbar />
            <Container>
                {title}
                <Form onSubmit={this.handleSubmit}>
                    <FormGroup>
                        <Label for="name">Name</Label>
                        <Input type="text" name="name" id="name" value={item.name || ''}
                            onChange={this.handleChange} autoComplete="name" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="address">Address</Label>
                        <Input type="text" name="address" id="address" value={item.address || ''}
                            onChange={this.handleChange} autoComplete="address-level1" />
                    </FormGroup>
                    <FormGroup>
                        <Label for="city">City</Label>
                        <Input type="text" name="city" id="city" value={item.city || ''}
                            onChange={this.handleChange} autoComplete="address-level1" />
                    </FormGroup>
                    <div className="row">
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="stateOrProvince">State/Province</Label>
                            <Input type="text" name="stateOrProvince" id="stateOrProvince" value={item.stateOrProvince || ''}
                                onChange={this.handleChange} autoComplete="address-level1" />
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="country">Country</Label>
                            <Input type="text" name="country" id="country" value={item.country || ''}
                                onChange={this.handleChange} autoComplete="address-level1" />
                        </FormGroup>
                        <FormGroup className="col-md-2 mb-3">
                            <Label for="postalCode">Postal Code</Label>
                            <Input type="text" name="postalCode" id="postalCode" value={item.postalCode || ''}
                                onChange={this.handleChange} autoComplete="address-level1" />
                        </FormGroup>
                        <FormGroup className="col-md-3 mb-3">
                            <Label for="phoneNumber">Phone Number</Label>
                            <Input type="text" name="phoneNumber" id="phoneNumber" value={item.phoneNumber || ''}
                                onChange={this.handleChange} autoComplete="address-level1" />
                        </FormGroup>
                    </div>
                    <FormGroup>
                        <Button color="primary" type="submit">Save</Button>{' '}
                        <Button color="secondary" tag={Link} to="/restaurants">Cancel</Button>
                    </FormGroup>
                </Form>
            </Container>
        </div>
    }
}

export default withRouter(RestaurantEdit);