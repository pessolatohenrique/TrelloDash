import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default class ListForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list_name: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.currentTarget;

        this.setState({
            [target.name]: (target.type === 'checkbox') ? target.checked : target.value
        });
    }

    componentWillReceiveProps() {
        const list_info = this.props.list_info;
        if (list_info) {
            this.setState({list_name: list_info.name});
        }
        
    }

    render() {
        const { createList, updateList,
            invalid_list, toggleCollapse, list_info } = this.props;
        return (
            <Form onSubmit={
                (event) => {
                    if (list_info) {
                        updateList(event, this.state, list_info.id, function(event){
                            toggleCollapse(event, "list");
                        });
                        
                    } else {
                        createList(event, this.state, function(event){
                            toggleCollapse(event, "list");
                        });
                        this.setState({
                            list_name:''
                        });
                    }
                }
            }>
                <FormGroup row>
                    <Col md={12}>
                        <FormGroup>
                            <Label for="name">Nome</Label>
                            <Input type="text" name="list_name" id="list_name"
                                onChange={this.handleChange}
                                value={this.state.list_name}
                                placeholder="Nome da lista" 
                                invalid={invalid_list}
                            />
                            <FormFeedback>
                                Este campo deve ter, no mínimo, 4 caracteres
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                </FormGroup>

                <Button color="info" className="btn-space">
                    {list_info?"Atualizar":"Adicionar"}
                </Button>
                <Button color="danger" onClick={(event) => {
                        this.props.toggleCollapse(event,"list")
                    }
                    
                }>Cancelar</Button>
            </Form>            
        )
    }
}