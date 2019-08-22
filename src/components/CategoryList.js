import React from "react";

export default class CategoryList extends React.Component {
  render() {
    if (this.props.category) {
      this.props.category.map(category => (event, index) => {
        return (
          <button key={index} className={`btn-${event.category}`}>
            {event.category}
          </button>
        );
      });
    }else{
      return ( 
      <div>Loading..!</div>
      );
    }
  }
}
