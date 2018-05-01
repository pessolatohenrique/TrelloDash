import React, { Component } from 'react';
import MainMenu from './components/MainMenu';
import Boards from './components/Boards';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="index">
          <MainMenu />
          <div className="container">
            <Boards />
          </div>  
      </div>
    );
  }
}

export default App;
