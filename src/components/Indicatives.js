import React, { Component } from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import IndicativePanel from './IndicativePanel';
import PieChart from './PieChart';
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
            loader_status: false,
            option_selected: '',
            boards_select: []
        }
    }

    componentDidMount() {
        const store = this.props.store;
        
        this.setState( { loader_status : true });

        BoardLogic.list(store)
        .then(boards => {
            BoardLogic.mapToSelect(store, boards);

            return boards;
        })
        .then(result => BoardLogic.getLabels(store, result))
        .then(cards => cards.length > 0?CardLogic.listFromUser(store):[])
        .then(most_boards => {
            BoardLogic.getMostUse(store, most_boards, this.state.boards);
            this.setState( { loader_status : false});
        });

        store.subscribe(() => {
            this.setState({
                boards: store.getState().board['boards'],
                labels: store.getState().dashboard.labels,
                cards: store.getState().dashboard.cards,
                boards_most: store.getState().dashboard.boards_most,
                boards_select: store.getState().dashboard.boards_select,
                lists: store.getState().board.board_lists,
                cards_total: store.getState().dashboard.cards_total,
                labels_total: store.getState().dashboard.labels_total
            });
        });        
    }

    handleChangeSelect = (selectedOption) => {
        this.setState( { loader_status : true });

        if (selectedOption.value !== this.state.option_selected.value) {
            this.setState({ option_selected: selectedOption }, function() {
                const shortLink = selectedOption.value;
    
                BoardLogic.getBoardList(shortLink)
                .then(response => BoardLogic.getCards(this.props.store, response));
            });
        } else {
            this.setState( { loader_status : false });
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.lists && prevState.lists !== this.state.lists) {
            const store = this.props.store;
            const boards = this.state.boards;
            const selected = this.state.option_selected.value;
            CardLogic.mapTotalByList(store, this.state.lists)
            .then(response => CardLogic.joinCards(store, this.state.lists))
            .then(response => CardLogic.countLabels(store, boards, selected, response))
            .then(response => this.setState({ loader_status : false}));
        }
        
    }

    
    render() {
        const { boards, labels, cards, boards_most, loader_status, 
            option_selected, boards_select, cards_total, labels_total
        } = this.state;

        return (
        <section>
            <CustomToast />

            {loader_status && <Loader />}

            <div className="row">
                <div className="col-md-12">
                    <label htmlFor="select_board">Selecione o Quadro</label>
                    <Select
                        name="select_board"
                        value={option_selected}
                        onChange={this.handleChangeSelect}
                        options={boards_select}
                        clearable={false}
                    />
                    <br />
                </div>
            </div>

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
            
            {cards_total &&
            <section className="most-indicatives space-div">
                <h5>Estatísticas</h5>
                <div className="row">
                    <div className="col-md-6">
                        <PieChart 
                            chart_id="chart_by_list"
                            title="Cartões por Lista"
                            data={cards_total}
                        />
                    </div>
                    <div className="col-md-6">
                        <PieChart 
                            chart_id="chart_by_label"
                            title="Etiquetas por Quadro"
                            data={labels_total}
                        />
                    </div>
                </div>

            </section>
            }
            
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