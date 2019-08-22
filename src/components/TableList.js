import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import axios from "axios";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }
  componentDidMount() {
    axios.get("https://api.myjson.com/bins/109m7i").then(response => {
      this.setState({
        products: response.data
      });
    });
  }

  componentWillReceiveProps(newProps){
    console.log("componentWillReceiveProps child",newProps);
    this.setState({
      products: newProps.userData
    })
  }

  render() {
    return (
      <div className="col-md-8 offset-2">
        <h3 className="title" style={{ paddingTop: "30px" }}>
          Products List
        </h3>
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
            {this.state.products.length > 0 ? (
              this.state.products.map((event, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{event.category}</td>
                    <td>{event.name}</td>
                    <td>{event.price}</td>
                    {event.stocked ? (
                      <td className="text-success">In Stock</td>
                    ) : (
                      <td className="text-danger">Out of Stock</td>
                    )}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default TableList;
