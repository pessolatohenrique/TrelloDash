import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, Fade } from 'reactstrap';
import List from './List';
import CollapseHelper from './CollapseHelper';
import BoardLogic from '../logicals/BoardLogic';
import ListLogic from '../logicals/ListLogic';
import CardLogic from '../logicals/CardLogic';
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
    this.createCard = this.createCard.bind(this);
    this.deleteCard = this.deleteCard.bind(this);
    this.findCard = this.findCard.bind(this);
    this.updateCard = this.updateCard.bind(this);
    this.state = {
        activeTab: '1',
        boards: [],
        board_lists: [],
        board_info: {},
        list_info: {},
        collapse: false,
        collapse_list: false,
        collapse_card: false,
        invalid_board: false,
        invalid_list: false,
        invalid_card: false,
        fadeIn: true 
    };
  }

  componentWillMount(){      
      let store = this.props.store;
      store.subscribe(() => {
        this.setState({
            boards : store.getState().board['boards'],
            board_lists: store.getState().board['board_lists'],
            board_info: store.getState().board['board_info'],
            list_info: store.getState().board['list_info'],
            card_info: store.getState().board['card_info']
        });
      });
    }

  componentDidMount() {
     BoardLogic.list(this.props.store);
    //  BoardLogic.getBoardList(this.props.store, "OoLAzfVp");
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

    createCard(event, fields, callback) {
        event.preventDefault();
        if (fields.card_name.length <= 3) {
            this.setState({invalid_card:true});
            return false;
        }
        this.setState({invalid_card:false});   
        CardLogic.create(this.props.store, fields);   
        callback(event);
    }

    deleteCard(card_id, list_id) {
        const resp = window.confirm("Deseja realmente excluir este card?");

        if (resp) {
            CardLogic.delete(this.props.store, card_id, list_id);
        }
    }

    findCard(card_info) {
        CardLogic.find(this.props.store, card_info);
        this.setState({collapse_card: true});
    }

    updateCard(event, fields, card_id) {
        event.preventDefault();
        event.preventDefault();
        if (fields.card_name.length <= 3) {
            this.setState({invalid_card:true});
            return false;
        }
        this.setState({invalid_card:false, collapse_card: false});
        CardLogic.update(this.props.store, fields, card_id);
    }

  /**
   * realiza a troca de abas do componente de navegação
   * @param {String} tab ID do quadro a ser trocado 
   * @param {String} shortLink Link fornecido a ser trocado e pesquisado
   */
  toggle(tab, shortLink) {
    if (this.state.activeTab !== tab) {
        
        BoardLogic.getBoardList(shortLink)
        .then(response => BoardLogic.getCards(this.props.store, response));

        this.setState({
            activeTab: tab,
            collapse_list: false,
            collapse_card: false
        });
    }
  }

  render() {
    let { boards, board_lists, invalid_board, board_info, list_info ,invalid_list, collapse_list, 
        invalid_card, collapse_card, card_info
    } = this.state;

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
                        createCard={this.createCard}
                        updateCard={this.updateCard}
                        board_info={board_info}
                        board_lists={board_lists}
                        list_info={list_info}
                        card_info={card_info}
                        invalid_board={invalid_board}
                        invalid_list={invalid_list}
                        collapse_list={collapse_list}
                        collapse_card={collapse_card}
                        invalid_card={invalid_card}
                        
                    />
                    <Row>
                        <Col sm="12">
                        {board_lists !== undefined && board_lists.map(list =>
                        <Fade in={this.state.fadeIn} timeout={100} key={list.id}>
                            <List name={list.name} id={list.id} board_id={list.idBoard} cards={list.cards} key={list.id} 
                                findList={this.findList} deleteCard={this.deleteCard}
                                findCard={this.findCard}
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