import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import List from './List';
import BoardLogic from '../logicals/BoardLogic';
import classnames from 'classnames';

export default class Boards extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        activeTab: '1',
        boards: []
    };
  }

  componentWillMount(){
    let store = this.props.store;
      store.subscribe(() => {
        this.setState({boards : store.getState().board}, function() {
            let tail = this.state.boards._tail;
            let first_id = tail.array[0].id;
            this.setState({activeTab: first_id});
        });
      });
    }

  componentDidMount() {
     BoardLogic.list(this.props.store);
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {
      let { boards } = this.state;
    return (
      <div>
        <Nav tabs>
            {boards.map(board => 
                <NavItem key={board.id}>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === board.id })}
                    onClick={() => { this.toggle(board.id); }}
                    >
                    {board.name}
                    </NavLink>
                </NavItem>
            )}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
            {boards.map(board => 
                <TabPane tabId={board.id} key={board.id}>
                    <Row>
                        {board.name}
                        <Col sm="12">
                            <List />
                            <List />
                            <List />
                        </Col>
                    </Row>
                </TabPane>
            )}
        </TabContent>
      </div>
    );
  }
}