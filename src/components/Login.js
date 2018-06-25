import React, { Component } from 'react';
import { Card, CardBody,
    CardTitle, CardSubtitle, Button,
    Form, FormGroup, Label, Input
} from 'reactstrap';

import CustomToast from './CustomToast';
import { showError } from '../common/ErrorHelper';
import LoginRules from './LoginRules';
import LoginLogic from '../logicals/LoginLogic';

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            trello_key: '',
            trello_token: ''
        };

        this.submitForm = this.submitForm.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    componentWillMount() {
        if (this.props.location.query.valid_login) {
            showError("Você precisa estar logado para acessar esta página!");
        }
        console.log(this.props.location);
        // msg:this.props.location.query.msg
    }

    submitForm(event) {
        event.preventDefault();
        LoginLogic.authorize(this.state.trello_key, this.state.trello_token);
        this.resetForm();
    }

    resetForm() {
        this.setState({ trello_key: '', trello_token: ''});
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({ [name]: value });
    }

    render() {
        return (
            <div className="wrapper">
                <CustomToast />

                <div className="login-form">
                    
                    <Card>
                        <CardBody>
                            <CardTitle>
                                <img src={process.env.PUBLIC_URL + '/logo01.jpg'} alt="Login" />
                            </CardTitle>
                            <CardSubtitle>
                                Instruções de acesso
                            </CardSubtitle>
                            
                            <LoginRules />

                            <div className="submit-login">
                                <Form onSubmit={this.submitForm}>
                                    <FormGroup>
                                        <Label for="trello_key">Chave</Label>
                                        <Input type="text" name="trello_key" 
                                            id="trello_key" 
                                            placeholder="Key obtida nas intruções" 
                                            value={this.state.trello_key}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <Label for="trello_token">Token</Label>
                                        <Input type="text" name="trello_token" 
                                            id="trello_token" 
                                            placeholder="Token obtido nas intruções" 
                                            value={this.state.trello_token}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                
                                    <Button color="info" type="submit">Login</Button>{' '}
                                    <Button color="warning" type="button"
                                        onClick={this.resetForm}>
                                        Limpar
                                    </Button>
                                </Form>

                            </div>
                        </CardBody>
                    </Card>
                </div>
            </div>
        )
    }
}