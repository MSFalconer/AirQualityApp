import React, { Component } from "react";
import Search from "./components/Search/Search.jsx";
import Card from "./components/Card/Card.jsx";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cardsActive: false
    };
    this.handleClick = this.handleClick.bind(this);

    this.locations = [];
  }

  // fetch UK cities data from api
  // TO DO: current city count only 100 - check if there is more
  componentWillMount() {
    // normal limit of request is set to 100 - checked the max number of returned citys - ammened limit to 112;
    fetch("https://api.openaq.org/v1/cities?country=GB&limit=112")
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

  // request location air results
  requestCityData(city) {
    const amCity = city.replace(/\s/, "-");
    const api = "https://api.openaq.org/v1/latest?country=GB&city=";
    const locationUrl = api + amCity;

    fetch(locationUrl)
      .then(response => {
        // return response as json
        return response.json();
      })
      .then(response => {
        const results = response.results;
        results.forEach(item => {
          const found = this.locations.some(
            obj => obj.location === item.location
          );
          if (!found) {
            this.locations.unshift(item);
          }
        });

        this.setState({
          cardsActive: true
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // on click request city data
  handleClick(event, city) {
    this.requestCityData(city);
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

        {this.locations &&
          this.locations.map((item, i) => {
            return <Card {...item} />;
          })}
      </div>
    );
  }
}

export default App;
