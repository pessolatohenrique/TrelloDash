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
        boards: [],
        board_lists: []
    };
  }

  getFirstTab() {
    // let store = this.props.store;
    // let tail = this.state.boards;

    // let first = tail[0];

    // this.setState({activeTab: first.id});
  }

  componentWillMount(){
      let store = this.props.store;
      store.subscribe(() => {
        this.setState({
            boards : store.getState().board['boards'],
            board_lists: store.getState().board['board_lists']
        });
      });
    }

  componentDidMount() {
     BoardLogic.list(this.props.store);
    //  BoardLogic.getBoardList(this.props.store, "OoLAzfVp");
  }

  /**
   * realiza a troca de abas do componente de navegação
   * @param {String} tab ID do quadro a ser trocado 
   * @param {String} shortLink Link fornecido a ser trocado e pesquisado
   */
  toggle(tab, shortLink) {
    if (this.state.activeTab !== tab) {
        BoardLogic.getBoardList(this.props.store, shortLink);
        this.setState({
            activeTab: tab
        });
    }
  }

  render() {
    let { boards, board_lists } = this.state;

    return (
      <div>
        <Nav tabs>
            {boards && boards.map((board, index) => 
                <NavItem key={board.id}>
                    <NavLink
                    className={classnames({ active: this.state.activeTab === board.id })}
                    onClick={() => { this.toggle(board.id, board.shortLink); }}
                    >
                    {board.name}
                    </NavLink>
                </NavItem>
            )}
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
            {boards && boards.map(board => 
                <TabPane tabId={board.id} key={board.id}>
                    <Row>
                        <Col sm="12">
                        {board_lists !== undefined && board_lists.map(list =>
                            <List name={list.name} key={list.id} />
                        )}
                        </Col>
                    </Row>
                </TabPane>
            )}
        </TabContent>
      </div>
    );
  }
}