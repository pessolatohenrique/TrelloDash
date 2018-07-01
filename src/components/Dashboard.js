import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Indicatives from './Indicatives';
import MainMenu from './MainMenu';

class Dashboard extends Component {
    render() {
        return (
            <div className="index">
                <MainMenu />
                <div className="container">
                    <Indicatives store={this.context.store}/>
                </div>  
            </div>
        )
    }
}

Dashboard.contextTypes = {
    store: PropTypes.object.isRequired
}

export default Dashboard;