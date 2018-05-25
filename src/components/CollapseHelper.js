import React, { Component } from 'react';
import { Collapse, CardBody, Card, Row, Col } from 'reactstrap';
import BoardForm from './BoardForm';
import DropdownHelper from './DropdownHelper';

export default class CollapseHelper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        };
    }

    toggleCollapse(event, type) {
        event.preventDefault();
        switch(type) {
            case "board": this.setState({ collapse: !this.state.collapse }); break;
            default: console.log("Parametro collapse inválido. Verifique"); break;
        }
    }

    render() {
        const { createBoard, deleteBoard , findBoard, updateBoard, 
            invalid_board, board_info } = this.props;

        return (
        <div>
            <Row>
                <Col md="1">
                    <DropdownHelper 
                        toggleName={"Quadro"}
                        toggleCollapse={this.toggleCollapse.bind(this)} 
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
                            toggleCollapse={this.toggleCollapse.bind(this)} />
                    </CardBody>
                </Card>
            </Collapse>
        </div>
        );
    }
}