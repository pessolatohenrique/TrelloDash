import React, { Component } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

export default class Example extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
        dropdownOpen: false
    };
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {
    const { toggleCollapse, deleteBoard, findBoard } = this.props;

    return (
    <div>
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="primary">
            Quadro
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem onClick={toggleCollapse}>Adicionar</DropdownItem>
            <DropdownItem onClick={(event) => {
                    findBoard(event)
                    toggleCollapse(event);
                }
            }>Atualizar</DropdownItem>
            <DropdownItem onClick={deleteBoard}>Excluir</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    );
  }
}