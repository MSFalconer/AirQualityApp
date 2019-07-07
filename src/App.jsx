import React, { Component } from "react";
import Search from "./components/Search/Search.jsx";
import Card from "./components/Card/Card.jsx";
import "./App.scss";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      cardsActive: false,
      locations: []
    };
    this.requestCityData = this.requestCityData.bind(this);
    this.removeCard = this.removeCard.bind(this);
  }

  // fetch UK cities data from api
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
        console.log(response.results);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // request location air results
  requestCityData(city) {
    const amCity = city.replace(/\s/, "+").replace(/&/, "%26");
    const api = "https://api.openaq.org/v1/latest?country=GB&city=";
    const locationUrl = api + amCity;
    console.log(locationUrl);

    fetch(locationUrl)
      .then(response => {
        // return response as json
        return response.json();
      })
      .then(response => {
        const locations = this.state.locations;
        const results = response.results.reverse();
        results.forEach(item => {
          const found = locations.some(obj => obj.location === item.location);
          if (!found) {
            locations.unshift(item);
          }
        });

        this.setState({
          cardsActive: true,
          locations: locations
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  // remove card from array
  removeCard(location) {
    // filter locations array
    let newArr = this.state.locations.filter(
      item => item.location !== location
    );
    this.setState({
      locations: newArr
    });
  }

  render() {
    const { data, locations } = this.state;

    return (
      <div className="App">
        <h1>Compare your air</h1>
        <h2>Compare the air quality between cities in the UK.</h2>
        <h2>Select cities to compare using the search tool below.</h2>
        <div className="Container">
          <Search data={data} requestCityData={this.requestCityData} />
        </div>

        <div className="Container">
          {locations &&
            locations.map((item, i) => {
              return (
                <Card
                  key={item.location.replace(/\s/, "")}
                  {...item}
                  removeCard={this.removeCard}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default App;
