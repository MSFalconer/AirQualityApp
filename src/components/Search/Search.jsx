import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  // on change event to capture input value and set state
  handleChange(event) {
    this.setState({ value: event.target.value.toLowerCase() });
  }

  // highlight input value
  highlighter(text) {
    const value = this.state.value;
    const textSub = text.substring(0, value.length);
    const textSlice = text.slice(value.length);
    return (
      <>
        <b>{sub}</b>
        {strSlice}
      </>
    );
  }
  render() {
    const { value } = this.state;
    const { data, handleClick } = this.props;

    return (
      <div className="Search">
        <input
          className="Search__Input"
          type="text"
          value={value}
          onChange={this.handleChange}
          placeholder="Enter city name..."
        />

        <div className="Search__Results">
          <ul>
            {value &&
              data
                .filter(item => {
                  return item.city.toLowerCase().startsWith(value);
                })
                .map((item, i) => {
                  return (
                    <li key={item.city.replace(/\s/, "")} onClick={handleClick}>
                      {this.highlighter(item.city)}
                    </li>
                  );
                })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;

//https://api.openaq.org/v1/latest?country=GB&city=Stoke-on-Trent
