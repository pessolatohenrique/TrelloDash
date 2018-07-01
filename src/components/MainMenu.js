import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem 
} from 'reactstrap';

import { createToast } from '../common/ToastHelper';
import { destroySession } from '../common/AuthHelper';
import { browserHistory } from 'react-router';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import faCoffee from '@fortawesome/fontawesome-free-solid/faCoffee';

class MainMenu extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.logoutUser = this.logoutUser.bind(this);

        this.state = {
            isOpen: false
        };
    }
    
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    logoutUser() {
        destroySession();
        browserHistory.push('/');
        createToast("Deslogado com sucesso!");
    }

    render() {
        return (
            <div>
              <Navbar color="trello" light expand="md">
                <NavbarBrand href="/">TrelloDash</NavbarBrand>
                <NavbarToggler onClick={this.toggle} />
                <Collapse isOpen={this.state.isOpen} navbar>
                  <Nav className="ml-auto" navbar>
                    <NavItem>
                        <NavLink href="/dashboard">Dashboard</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink href="/general">Visão Geral</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                      <DropdownToggle nav>
                        <FontAwesomeIcon icon={faCoffee} />
                        &nbsp;
                        <strong>
                            {localStorage.getItem('fullname')}
                        </strong>
                      </DropdownToggle>
                      <DropdownMenu right>
                        <DropdownItem className="profile-menu">
                            <img src={`http://trello-avatars.s3.amazonaws.com/${localStorage.getItem('avatar_hash')}/170.png`}
                                alt="Foto de perfil" 
                            />
                        </DropdownItem>
                        <DropdownItem>
                            <strong>Nome Completo: </strong>{localStorage.getItem('fullname')}
                        </DropdownItem>
                        <DropdownItem>
                            <strong>Usuário: </strong>@{localStorage.getItem('username')}
                        </DropdownItem>
                        <DropdownItem>
                            <strong>E-mail: </strong>{localStorage.getItem('email')}
                        </DropdownItem>
                        <DropdownItem className="action-button" onClick={this.logoutUser}>
                            Logout
                        </DropdownItem>
                      </DropdownMenu>
                    </UncontrolledDropdown>
                  </Nav>
                </Collapse>
              </Navbar>
            </div>
        );
    }
}

export default MainMenu;