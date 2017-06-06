import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import ReduxProviderAutocomplete from './ReduxProviderAutocomplete';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React single page application</h2>
        </div>
        <p className="App-intro">
            with an autocomplete field:
        </p>
          <div className="App-autocomplete">
              <ReduxProviderAutocomplete />
          </div>
      </div>
    );
  }
}

export default App;
