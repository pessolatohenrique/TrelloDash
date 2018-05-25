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
    const { toggleName, callBackUpdate, callBackDelete, callBackInsert, hasDelete, hasUpdate } = this.props;

    return (
    <div>
      <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
        <DropdownToggle caret color="primary">
            {toggleName}
        </DropdownToggle>
        <DropdownMenu>
            <DropdownItem onClick={callBackInsert}>Adicionar</DropdownItem>
            {hasUpdate !== false && <DropdownItem onClick={callBackUpdate}>Atualizar</DropdownItem>}
            {hasDelete !== false && <DropdownItem onClick={callBackDelete}>Excluir</DropdownItem>}
        </DropdownMenu>
      </Dropdown>
    </div>
    );
  }
}