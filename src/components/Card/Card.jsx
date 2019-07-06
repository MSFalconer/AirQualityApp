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

  readableDate(date) {
    const lastUpdated = new Date(date);
    const today = new Date();
    const dateDifference = today.getTime() - lastUpdated.getTime();

    const oneHour = 1000 * 60 * 60;
    const backToHours = Math.round(dateDifference / oneHour);

    const oneDay = 1000 * 60 * 60 * 24;
    const backToDays = Math.round(dateDifference / oneDay);
    let readableFormat;

    if (backToDays < 1) {
      // hours
      let hours = Math.round(backToHours);
      if (hours === 1) {
        readableFormat = `an hour ago`;
      } else {
        readableFormat = `${Math.round(backToHours)} hours ago`;
      }
    } else if (backToDays >= 1 && backToDays < 7) {
      // days
      let days = Math.round(backToDays);
      if (days === 1) {
        readableFormat = `${days} day ago`;
      } else {
        readableFormat = `${days} days ago`;
      }
    } else if (backToDays >= 7) {
      // weeks
      let weeks = Math.round(backToDays / 7);
      if (weeks === 1) {
        readableFormat = `${weeks} week ago`;
      } else {
        readableFormat = `${weeks} weeks ago`;
      }
    }

    if (readableFormat) {
      return `updated ${readableFormat}`;
    }
  }
  render() {
    const { city, country, location, measurements } = this.props;
    console.log(this.props);
    return (
      <div className="Card">
        <span
          className="Card__Close"
          onClick={() => this.handleClick(location)}
        >
          X
        </span>
        <span className="Card__Time">
          {this.readableDate(this.props.measurements[0].lastUpdated)}
        </span>
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
