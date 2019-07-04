import React, { Component } from "react";
import Search from "./components/Search/Search.jsx";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    fetch("https://api.openaq.org/v1/cities?country=GB")
      .then(response => {
        return response.json();
      })
      .then(response => {
        console.log(response.results);
        this.setState({
          data: response.results
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const { data } = this.state;

    const AppStyle = {};
    return (
      <div className="App">
        <h1>Compare your air</h1>
        <h2>
          Compare the air quality between cities in the UK. Select cities to
          compare using the search tool below.
        </h2>
        <Search data={data} />
      </div>
    );
  }
}

export default App;
