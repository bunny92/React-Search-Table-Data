import React, { Component } from "react";
import TableList from "../components/TableList";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { sendUserData } from "./../actions/Index";
import Form from "react-bootstrap/Form";
import { Grid, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";

class Accounting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Category: "",
      Product: "",
      Price: "",
      Status: null,
      objectData: {}
    };
  }

  getCategoryName(event) {
    this.setState({
      Category: event.target.value
    })

  }

  getProductName(event) {
    this.setState({
      Product: event.target.value
    });
  }

  getPrice(event) {
    this.setState ({
      Price: event.target.value
    })
  }

  getStatus(event) {
    this.setState ({
      Status: event.target.value
    })
  }

  submitData(event) {
    event.preventDefault();
    this.state.objectData["category"] = this.state.Category;
    this.state.objectData["name"] = this.state.Product;
    this.state.objectData["price"] = this.state.Price;
    this.state.objectData["stocked"] = (this.state.Status === "true");
    this.setState({
      objectData: this.state.objectData
    }, () => {
      this.props.sendUserData(this.state.objectData);
      this.state.Category = "";
      this.state.Product = "";
      this.state.Price = "";
      this.state.Status = "";
      this.state.objectData = {};
      this.setState({
        category: this.state.Category,
        name: this.state.Product,
        price: this.state.Price,
        stocked: (this.state.Status === "true"),
        objectData: this.state.objectData
      });
    });
  }

  render() {
    return (
      <div>
        <div className="col-md-8 offset-2" style={{ paddingTop: "30px" }}>
          <Form onSubmit={this.submitData.bind(this)}>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridCategory">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.Category}
                  onChange={this.getCategoryName.bind(this)}
                  placeholder="Enter Category"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridProduct">
                <Form.Label>Product</Form.Label>
                <Form.Control
                  type="text"
                  value={this.state.Product}
                  onChange={this.getProductName.bind(this)}
                  placeholder="Product Name"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={this.state.Price}
                  onChange={this.getPrice.bind(this)}
                  placeholder="Enter Price"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridStatus">
                <Form.Label>Status</Form.Label>
                <Form.Control as="select" onChange={this.getStatus.bind(this)}>
                  <option value="">Choose Status</option>
                  <option value="true">Instock</option>
                  <option value="false">Out Stock</option>
                </Form.Control>
              </Form.Group>
            </Form.Row>
            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </div>
        <TableList />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
  
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sendUserData: sendUserData }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Accounting);
