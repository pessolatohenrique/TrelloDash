import React, { Component } from 'react';
import { Collapse, CardBody, Card, Row, Col } from 'reactstrap';
import BoardForm from './BoardForm';
import ListForm from './ListForm';
import CardBoardForm from './CardBoardForm';
import DropdownHelper from './DropdownHelper';

export default class CollapseHelper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false,
            collapse_list: false,
            collapse_card: false
        };
    }

    toggleCollapse(event, type) {
        event.preventDefault();
        this.setState({
            collapse: false,
            collapse_list: false,
            collapse_card: false
        });
        switch(type) {
            case "board": this.setState({ collapse: !this.state.collapse }); break;
            case "list" : this.setState({collapse_list: !this.state.collapse_list}); break;
            case "card": this.setState({collapse_card: !this.state.collapse_card}); break;
            default: console.log("Parametro collapse inválido. Verifique"); break;
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.collapse_list !== nextProps.collapse_list) {
            this.setState({ collapse_list: nextProps.collapse_list});
        }

        if (this.state.collapse_card !== nextProps.collapse_card) {
            this.setState({ collapse_card: nextProps.collapse_card});
        }
        
    }

    render() {
        const { createBoard, deleteBoard , findBoard, updateBoard, findList,
            createList, updateList ,list_info, 
            invalid_list, invalid_board, board_info, board_lists,
            createCard, invalid_card, card_info,
            updateCard } = this.props;

        return (
        <div>
            <Row>
                <Col md="1">
                    <DropdownHelper 
                        toggleName={"Quadro"}
                        toggleCollapse={this.toggleCollapse.bind(this)} 
                        callBackInsert={(event) => {
                                this.toggleCollapse(event, "board");
                            }
                        }
                        callBackUpdate={(event) => {
                                findBoard(event)
                                this.toggleCollapse(event, "board");
                            }
                        }
                        callBackDelete = {(event) => {
                                deleteBoard(event)
                            }
                        }
                        deleteBoard={deleteBoard}
                        findBoard={findBoard}/>
                </Col>
                <Col md="1">
                    <DropdownHelper 
                        toggleName={"Lista"}
                        callBackInsert={(event) => {
                                this.toggleCollapse(event, "list");
                            }
                        }
                        callBackUpdate={(event) => {
                                findList(event)
                                this.toggleCollapse(event, "list");
                            }
                        }
                        hasUpdate={false}
                        hasDelete={false}
                        toggleCollapse={this.toggleCollapse.bind(this)} 
                        deleteBoard={deleteBoard}
                        findBoard={findBoard}/>
                </Col>
                <Col md="1">
                    <DropdownHelper 
                        toggleName={"Cartão"}
                        callBackInsert={(event) => {
                                this.toggleCollapse(event, "card");
                            }
                        }
                        callBackUpdate={(event) => {
                                findList(event)
                                this.toggleCollapse(event, "card");
                            }
                        }
                        hasUpdate={false}
                        hasDelete={false}
                        toggleCollapse={this.toggleCollapse.bind(this)} 
                        deleteBoard={deleteBoard}
                        findBoard={findBoard}/>
                </Col>
            </Row>

            <Collapse isOpen={this.state.collapse}>
                <Card>
                    <CardBody>
                        <BoardForm createBoard={createBoard}
                            updateBoard={updateBoard}
                            invalid_board={invalid_board}
                            board_info={board_info}
                            toggleCollapse={this.toggleCollapse.bind(this)} 
                        />
                    </CardBody>
                </Card>
            </Collapse>

            <Collapse isOpen={this.state.collapse_list}>
                <Card>
                    <CardBody>
                        <ListForm 
                            createList={createList}
                            updateList={updateList}
                            invalid_list={invalid_list}
                            list_info={list_info}
                            toggleCollapse={this.toggleCollapse.bind(this)} 
                        />
                    </CardBody>
                </Card>
            </Collapse>

            <Collapse isOpen={this.state.collapse_card}>
                <Card>
                    <CardBody>
                        <CardBoardForm 
                            createCard={createCard}
                            updateCard={updateCard}
                            updateList={updateList}
                            invalid_card={invalid_card}
                            board_lists={board_lists}
                            card_info={card_info}
                            toggleCollapse={this.toggleCollapse.bind(this)} 
                        />
                    </CardBody>
                </Card>
            </Collapse>
        </div>
        );
    }
}