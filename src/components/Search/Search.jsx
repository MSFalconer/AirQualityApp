import React, { Component } from "react";
import "./Search.css";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { data } = this.props;

    return (
      <div className="Search">
        <input className="Search__Input" type="text" />

        <div className="Search__Results">
          <ul>
            {data.map((item, i) => {
              return <li>{item.city}</li>;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Search;

//https://api.openaq.org/v1/latest?country=GB&city=Stoke-on-Trent
