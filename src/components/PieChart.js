import React, { Component } from 'react';
import { Card, CardHeader, CardBody } from 'reactstrap';
import { Chart } from 'react-google-charts';

export default class PieChart extends Component {
    constructor() {
        super();
        this.state = {
            chart_data : {},
            chart_options: {}
        };
    }

    componentWillMount() {
        const chart_options = { pieHole: 0.2, is3D: false, 
            sliceVisibilityThreshold: 0,
            chartArea: {  width: "100%", height: "70%" },
            legend: { 
                // position : 'bottom',
                alignment: 'center'
            }
        };

        this.setState({ chart_options });
    }

    render() {
        const { chart_options } = this.state;
        const { chart_id, title, data } = this.props;

        return (
            <div className="pie-chart-section">
            
                <Card>
                    <CardHeader>{title}</CardHeader>
                    <CardBody>
                        {/* <CardText> */}
                            <Chart
                                chartType="PieChart"
                                data={ data?data:[] }
                                options={ chart_options }
                                graph_id={chart_id}
                                width="100%"
                                height="400px"
                                legend_toggle
                            />
                        {/* </CardText> */}
                    </CardBody>
                </Card>
            </div>
        )
    }
}