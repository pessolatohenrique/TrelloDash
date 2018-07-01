import React, { Component } from 'react';
import IndicativePanel from './IndicativePanel';
import BoardLogic from '../logicals/BoardLogic';
import { Card, CardFooter, CardBody, CardText } from 'reactstrap';
import CardLogic from '../logicals/CardLogic';
import CustomToast from './CustomToast';
import Loader from './Loader';

export default class Indicatives extends Component {
    constructor() {
        super();
        this.state = {
            total_labels: 0,
            boards: [],
            labels: [],
            cards: [],
            boards_most: [],
            loader_status: false
        }
    }

    componentWillMount() {
        const store = this.props.store;
        
        this.setState( { loader_status : true });

        BoardLogic.list(store)
        .then(result => BoardLogic.getLabels(store, result))
        .then(cards => cards.length > 0?CardLogic.listFromUser(store):[])
        .then(most_boards => {
            BoardLogic.getMostUse(store, most_boards, this.state.boards);
            this.setState( { loader_status : false});
            // return result;
        });

        store.subscribe(() => {
            this.setState({
                boards: store.getState().board['boards'],
                labels: store.getState().dashboard.labels,
                cards: store.getState().dashboard.cards,
                boards_most: store.getState().dashboard.boards_most
            });
        });
    }
    
    render() {
        const { boards, labels, cards, boards_most, loader_status } = this.state;

        return (
        <section>
            <CustomToast />

            {loader_status && <Loader />}

            <div className="indicatives">
                <div className="row">
                    <IndicativePanel 
                        cols={"col-md-4"}
                        color_style = {"card-primary indicative"}
                        icon = {"fa fa-clipboard fa-3x"}
                        total = {boards.length}
                        label = {"Quadros"}
                    />

                    <IndicativePanel 
                        cols={"col-md-4"}
                        color_style = {"card-success indicative"}
                        icon = {"fa fa-tasks fa-3x"}
                        total = {cards?cards.length:0}
                        label = {"Cartões"}
                    />

                    <IndicativePanel 
                        cols={"col-md-4"}
                        color_style = {"card-info indicative"}
                        icon = {"fa fa-hashtag fa-3x"}
                        total = {labels?labels.length:0}
                        label = {"Etiquetas"}
                    />
                </div>
            </div>
            
            {boards_most &&
                <div className="most-indicatives space-div">
                    <h5>Quadros mais utilizados</h5>
                    <div className="row">
                        {boards_most.map(item =>
                            <div className="col-md-4" key={item.board_id}>
                                <Card>
                                    <CardBody>
                                        <CardText>{item.board_name}</CardText>
                                    </CardBody>
                                    <CardFooter>{item.cards.length} Cards</CardFooter>
                                </Card>
                            </div>
                        )}
                    </div>
                </div>
            }
        </section>
        );
    }
}