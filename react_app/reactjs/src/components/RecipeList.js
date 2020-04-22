import React, { Component } from 'react';

import { Card, Table } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList } from '@fortawesome/free-solid-svg-icons'

export default class RecipeList extends Component {
    render() {
        return (
            <Card className={"border border-dark bg-dark text-white"}>
                <Card.Header><FontAwesomeIcon icon={faList} /> Recipe List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Title</th>
                                <th>HREF</th>
                                <th>Ingredients</th>
                                <th>Thumbnail</th>
                                <th>Price $</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr align="center">
                                Use an API to add data into here
                                <td colSpan="6">No Recipes Available.</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            );
    }

}
