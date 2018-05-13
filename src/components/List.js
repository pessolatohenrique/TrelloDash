import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import CardBoard from './CardBoard';

export default class List extends Component {
    render() {
        return (
            <div className="board-list">
                <div className="row">
                    <div className="col-md-10">
                        <h4>
                            {this.props.name} 
                        </h4>
                    </div>
                    <div className="col-md-2">
                        <Badge color="primary" pill className="badge-title">05 cards</Badge>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-4">
                        <CardBoard />
                    </div>
                    <div className="col-md-4">
                        <CardBoard />
                    </div>
                    <div className="col-md-4">
                        <CardBoard />
                    </div>
                    <div className="col-md-4">
                        <CardBoard />
                    </div>
                </div>
            </div>
        )
    }
}