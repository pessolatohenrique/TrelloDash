import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MainMenu from './components/MainMenu';
import Boards from './components/Boards';
import './App.css';

class App extends Component {
  render() {

    return (
      <div className="index">
          <MainMenu />
          <div className="container">
            <Boards store={this.context.store}/>
          </div>  
      </div>
    );
  }
}

App.contextTypes = {
    store: PropTypes.object.isRequired
}

export default App;