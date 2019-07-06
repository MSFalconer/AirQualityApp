import React, { Component } from "react";

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { city, country, location, measurements } = this.props;
    return (
      <div className="Card">
        <i>X</i>
        <span> time</span>
        <h3> {location} </h3>
        <p>{`in ${city}, United Kingdom`}</p>
        <b>
          {measurements.map((item, i) => {
            return ` ${item.parameter.toUpperCase()}: ${item.value}, `;
          })}
        </b>
      </div>
    );
  }
}

export default Card;
