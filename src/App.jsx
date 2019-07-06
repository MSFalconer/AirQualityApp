import React, { Component } from "react";
import Search from "./components/Search/Search.jsx";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };

    this.handleClick = this.handleClick.bind(this);
  }

  // fetch UK cities data from api
  // TO DO: current city count only 100 - check if there is more
  componentWillMount() {
    fetch("https://api.openaq.org/v1/cities?country=GB")
      .then(response => {
        // return response as json
        return response.json();
      })
      .then(response => {
        // set state as response results
        this.setState({
          data: response.results
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // on click request city data
  handleClick(event) {
    console.log(event);
  }

  render() {
    const { data } = this.state;

    return (
      <div className="App">
        <h1>Compare your air</h1>
        <h2>
          Compare the air quality between cities in the UK. Select cities to
          compare using the search tool below.
        </h2>
        <Search data={data} handleClick={this.handleClick} />
      </div>
    );
  }
}

export default App;
