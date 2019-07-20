import React, { Component } from 'react';
import Table from 'react-bootstrap/Table'

class TableList extends Component {

    render() {
        // if (this.props.fillSearch !== null && this.props.search.name.indexOf(this.props.fillSearch) === -1) {
        //    return null
        // }
        return (

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Category</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>

                    {(this.props.search.length > 0) ? this.props.search.map((event, index) => {

                        return (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{event.category}</td>
                                <td>{event.name}</td>
                                <td>{event.price}</td>
                                {event.stocked ? <td className="text-success">In Stock</td> : <td className="text-danger">Out of Stock</td>}
                            </tr>
                        )
                    }) : <tr><td colSpan="5">Loading...</td></tr>}
                </tbody>
            </Table>
        )
    }
}

export default TableList;