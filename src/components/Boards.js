import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Fade } from 'reactstrap';
import List from './List';
import CollapseHelper from './CollapseHelper';
import BoardLogic from '../logicals/BoardLogic';
import ListLogic from '../logicals/ListLogic';
import classnames from 'classnames';
import CustomToast from './CustomToast';

export default class Boards extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.createBoard = this.createBoard.bind(this);
    this.deleteBoard = this.deleteBoard.bind(this);
    this.findBoard = this.findBoard.bind(this);
    this.updateBoard = this.updateBoard.bind(this);
    this.createList = this.createList.bind(this);
    this.findList = this.findList.bind(this);
    this.updateList = this.updateList.bind(this);
    this.saveStorage = this.saveStorage.bind(this);
    this.state = {
        activeTab: '1',
        boards: [],
        board_lists: [],
        board_info: {},
        list_info: {},
        collapse: false,
        collapse_list: false,
        invalid_board: false,
        invalid_list: false,
        fadeIn: true 
    };
  }

  componentWillMount(){
      this.saveStorage();
      
      let store = this.props.store;
      store.subscribe(() => {
        this.setState({
            boards : store.getState().board['boards'],
            board_lists: store.getState().board['board_lists'],
            board_info: store.getState().board['board_info'],
            list_info: store.getState().board['list_info'],
        });
      });
    }

  componentDidMount() {
     BoardLogic.list(this.props.store);
    //  BoardLogic.getBoardList(this.props.store, "OoLAzfVp");
  }

  saveStorage() {
    sessionStorage.setItem("key", "3035a2cb9f26384284e94d2f545f2c0c");
    sessionStorage.setItem("token", "2b8048cfbb27c0f951f1632b13d58fc9541332bdc6bc4f06c022b7c02c244771");
  }

  createList(event, fields, callback) {
        const board_id = this.state.activeTab;
        event.preventDefault();
        if (fields.list_name.length <= 3) {
            this.setState({invalid_list:true});
            return false;
        }
        this.setState({invalid_list:false});   
        ListLogic.create(this.props.store, fields, board_id);   
        callback(event);
    }

    findList(event, list_info, callback) {
        event.preventDefault();
        ListLogic.find(this.props.store, list_info);
        this.setState({collapse_list: true});
    }

    updateList(event, fields, list_id, callback) {
        event.preventDefault();
        if (fields.list_name.length <= 3) {
            this.setState({invalid_list:true});
            return false;
        }

        this.setState({invalid_list:false,
            collapse_list: false
        });
        
        ListLogic.update(this.props.store, fields, list_id);
    }

  createBoard(event, fields, callback) {
      event.preventDefault();
      if (fields.board_name.length <= 3) {
          this.setState({invalid_board:true});
          return false;
      }
      this.setState({invalid_board:false});   
      BoardLogic.create(this.props.store, fields);   
      callback(event);
  }

  updateBoard(event, fields, board_id, callback) {
      event.preventDefault();
      if (fields.board_name.length <= 3) {
        this.setState({invalid_board:true});
        return false;
    }
    this.setState({invalid_board:false});
    BoardLogic.update(this.props.store, fields, board_id);
    callback(event);
  }

  findBoard(event) {
      event.preventDefault();
      const board_id = this.state.activeTab;
      BoardLogic.find(this.props.store, board_id);
  }

  deleteBoard(event) {
      event.preventDefault();
      const resp = window.confirm("Todas as listas e cards serão apagados. Deseja realmente excluir o quadro?");
      const board_id = this.state.activeTab;
      if (resp) {
          BoardLogic.delete(this.props.store, board_id);
      }
  }

  /**
   * realiza a troca de abas do componente de navegação
   * @param {String} tab ID do quadro a ser trocado 
   * @param {String} shortLink Link fornecido a ser trocado e pesquisado
   */
  toggle(tab, shortLink) {
    if (this.state.activeTab !== tab) {
        BoardLogic.getBoardList(this.props.store, shortLink, function(response, store) {
            BoardLogic.getCards(store, response);
        });
        this.setState({
            activeTab: tab,
            collapse_list: false
        });
    }
  }
  
  getFirstTab() {
    // let store = this.props.store;
    // let tail = this.state.boards;

    // let first = tail[0];

    // this.setState({activeTab: first.id});
  }

  render() {
    let { boards, board_lists, invalid_board, board_info, list_info ,invalid_list, collapse_list } = this.state;

    return (
      <div>
        <CustomToast />
        <Fade in={this.state.fadeIn} timeout={300}>
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
        </Fade>
        <TabContent activeTab={this.state.activeTab}>
            {boards && boards.map(board => 
                <TabPane tabId={board.id} key={board.id}>
                    <CollapseHelper 
                        createBoard={this.createBoard}
                        deleteBoard={this.deleteBoard}
                        findBoard={this.findBoard}
                        updateBoard={this.updateBoard}
                        createList={this.createList}
                        findList={this.findList}
                        updateList={this.updateList}
                        board_info={board_info}
                        list_info={list_info}
                        invalid_board={invalid_board}
                        invalid_list={invalid_list}
                        collapse_list={collapse_list}
                    />
                    <Row>
                        <Col sm="12">
                        {board_lists !== undefined && board_lists.map(list =>
                        <Fade in={this.state.fadeIn} timeout={100} key={list.id}>
                            <List name={list.name} id={list.id} board_id={list.idBoard} cards={list.cards} key={list.id} 
                                findList={this.findList}
                            />
                        </Fade>
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