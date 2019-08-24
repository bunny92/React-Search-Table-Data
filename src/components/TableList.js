import React, { Component } from "react";
import Table from "react-bootstrap/Table";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { deleteUserData, updateUsersData, sendUserData } from "./../actions/Index";
import axios from "axios";

class TableList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      updateCategory: "",
      updateProuct: "",
      updatePrice: "",
      updateStatus: null,
      updateObjectData: {},
      products: []
    };
  }
  componentDidMount() {
    axios.get("https://api.myjson.com/bins/109m7i").then(response => {
      console.log(response)
      this.props.sendUserData(response.data);
      this.setState({
        products: response.data
      });
    });
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      products: newProps.userData
    });
  }

  deleteData(index) {
    this.props.deleteUserData(index);
  }

  editData(data, id) {
    console.log("Update", data);
    this.setState({
      userId: id
    });
  }
  cancelUserData(id) {
    this.setState({
      userId: ""
    });
  }

  updateCategeory(event) {
    this.setState({
      updateCategory: event.target.value
    });
  }

  updateProduct(event) {
    this.setState({
      updateProuct: event.target.value
    });
  }

  updatePrice(event) {
    this.setState({
      updatePrice: event.target.value
    });
  }

  updateStatus(event) {
    this.setState({
      updateStatus: event.target.value
    });
  }

  updateUserData(data, id) {
    let oldCategory = data.category;
    let oldproduct = data.name;
    let oldPrice = data.price;
    let oldStatus = data.stocked;
    this.setState(
      {
        updateCategory: this.state.updateCategory
          ? this.state.updateCategory
          : oldCategory,
        updateProuct: this.state.updateProuct
          ? this.state.updateProuct
          : oldproduct,
        updatePrice: this.state.updatePrice ? this.state.updatePrice : oldPrice,
        updateStatus: this.state.updateStatus
          ? this.state.updateStatus
          : oldStatus
      },
      () => {
        this.state.updateObjectData["category"] = this.state.updateCategory;
        this.state.updateObjectData["name"] = this.state.updateProuct;
        this.state.updateObjectData["price"] = this.state.updatePrice;
        this.state.updateObjectData["stocked"] = (this.state.updateStatus === "true");
      
        this.setState(
          {
            updateObjectData: this.state.updateObjectData
          },
          () => {
            if (
              this.state.updateCategory !== null &&
              this.state.updateProuct !== null &&
              this.state.updatePrice !== null &&
              this.state.updateStatus !== null
            ) {
              if (
                this.state.updateCategory !== oldCategory ||
                this.state.updateProuct !== oldproduct ||
                this.state.updatePrice !== oldPrice ||
                this.state.updateStatus !== oldStatus
              ) {
                this.props.updateUsersData(this.state.updateObjectData, id);
              }
            }

            this.setState(
              {
                userId: ""
              },
              () => {
                this.setState({
                  updateCategory: "",
                  updateProuct: "",
                  updatePrice: "",
                  updateStatus: null,
                  updateObjectData: {}
                });
              }
            );
          }
        );
      }
    );
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
              <th>Delete</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {this.state.products ? (
              this.state.products.map((event, index) => {
                if (index === this.state.userId) {
                  return (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={event.category}
                          onChange={this.updateCategeory.bind(this)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={event.name}
                          onChange={this.updateProduct.bind(this)}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          defaultValue={event.price}
                          onChange={this.updatePrice.bind(this)}
                        />
                      </td>
                      <td>
                        <select
                          className="form-control"
                          defaultValue={event.stocked}
                          onChange={this.updateStatus.bind(this)}
                        >
                          <option value="">Choose Status</option>
                          <option value="true">Instock</option>
                          <option value="false">Out Stock</option>
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm"
                          onClick={this.cancelUserData.bind(this, index)}
                        >
                          {" "}
                          Cancel
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-info btn-sm"
                          onClick={this.updateUserData.bind(this, event, index)}
                        >
                          {" "}
                          Update
                        </button>
                      </td>
                    </tr>
                  );
                }
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
                    <td>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={this.deleteData.bind(this, index)}
                      >
                        Delete
                      </button>
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={this.editData.bind(this, event, index)}
                      >
                        Edit
                      </button>
                    </td>
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

function mapStateToProps(state) {
  return {
    userData: state.user.user
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    { deleteUserData: deleteUserData, updateUsersData: updateUsersData, sendUserData: sendUserData },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TableList);
