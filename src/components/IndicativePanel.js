import React, { Component } from 'react';
import { Card, CardBody,
    CardTitle, CardSubtitle } from 'reactstrap';

export default class IndicativePanel extends Component {
    render() {
        const { color_style, icon, total, label, cols } = this.props;
        
        return (
            <div className={cols}>
                <Card className={color_style}>
                    <CardBody>
                    <div className="row">
                        <div className="col-md-2">
                            <i className={icon}></i>
                        </div>
                        <div className="col-md-10">
                            <CardTitle>
                                {total}
                            </CardTitle>
                            <CardSubtitle>{label}</CardSubtitle>
                        </div>
                    </div>

                    </CardBody>
                </Card>
            </div>
        )
    }
}