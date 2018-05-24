import React, { Component } from 'react';
import { Collapse, CardBody, Card } from 'reactstrap';
import BoardForm from './BoardForm';
import DropdownHelper from './DropdownHelper';

export default class CollapseHelper extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapse: false
        };
    }

    toggleCollapse(event) {
        event.preventDefault();
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        const { createBoard, deleteBoard , findBoard, updateBoard, 
            invalid_board, board_info } = this.props;

        return (
        <div>
            <DropdownHelper toggleCollapse={this.toggleCollapse.bind(this)} 
                deleteBoard={deleteBoard}
                findBoard={findBoard}/>

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