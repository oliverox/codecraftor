import React, { Component } from 'react';
import { Button } from "@blueprintjs/core";
// import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Button intent="danger" text="Blueprint Button" />
        </header>
      </div>
    );
  }
}

export default App;
