import React, { Component } from "react";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { name } = this.props;
    return <h1>Hello, {name}</h1>;
  }
}

export default App;
