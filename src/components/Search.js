import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import TableList from "./TableList";
import "./Search.css";
// import CategoryList from './CategoryList';

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      search: null,
      search_filter: null,
      checked: false,
      input_search: ""
    };
  }

  async componentDidMount() {
    const url = "https://api.myjson.com/bins/109m7i";
    const response = await fetch(url);
    const data = await response.json();
    this.setState({ search: data, loading: false });
  }

  showInStockProducts(event) {
    if (!this.state.checked) {
      const filterData = event.filter(stock => stock.stocked);
      this.setState({
        search_filter: filterData,
        checked: !this.state.checked,
        input_search: ""
      });
    }
    if (this.state.checked) {
      this.setState({ checked: false });
    }
  }

  searchStockProducts = queryText => {
    let input = queryText.target.value.toLowerCase();
    this.setState({ input_search: input });
  };

  chnageText = (e) => {e.preventDefault(); this.props.title()};

  render() {
    var searchString = this.state.input_search.trim().toLowerCase();
    if (searchString.length > 0) {
      var fliteredData = this.state.search.filter(function(product) {
        return product.name.toLowerCase().match(searchString);
      });
    }
    return (
      <div className="gap">
        <div className="col-md-6 offset-3">
          <Form>
            <button onClick={this.chnageText.bind(this)}>Click</button>
            <Form.Group>
              <Form.Control
                type="text"
                value={this.state.input_search}
                onChange={this.searchStockProducts}
                placeholder="Enter Product Name"
              />
            </Form.Group>
            <Form.Group>
              <Form.Check
                type="checkbox"
                defaultChecked={this.state.checked}
                onChange={this.showInStockProducts.bind(
                  this,
                  this.state.search
                )}
                label="Only Show Products in Stock"
              />
            </Form.Group>
          </Form>
        </div>
        {this.state.loading || !this.state.search ? (
          <div>Loading...!</div>
        ) : (
          <div>
            <TableList
              search={
                fliteredData
                  ? fliteredData
                  : !this.state.checked
                  ? this.state.search
                  : this.state.search_filter
              }
            />
          </div>
        )}
      </div>
    );
  }
}
