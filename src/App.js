import React, { Component } from 'react';
import AirList from './components/airlist';
import AirInfo from './components/airinfo';

class App extends Component {
  render() {
    return (
      <div className="App center">
        <AirList />
        <AirInfo />
      </div>
    );
  }
}

export default App;
