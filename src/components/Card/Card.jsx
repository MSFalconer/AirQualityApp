import React, { Component } from "react";
import "./Card.css";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(location) {
    this.props.removeCard(location);
  }

  render() {
    const { city, country, location, measurements } = this.props;
    return (
      <div className="Card">
        <span
          className="Card__Close"
          onClick={() => this.handleClick(location)}
        >
          X
        </span>
        <span className="Card__Time"> time</span>
        <h3 className="Card__Location"> {location} </h3>
        <p className="Card__City">{`in ${city}, United Kingdom`}</p>
        <b className="Card__Measurements">
          Values:
          {measurements.map((item, i) => {
            return ` ${item.parameter.toUpperCase()}: ${item.value}, `;
          })}
        </b>
      </div>
    );
  }
}

export default Card;
