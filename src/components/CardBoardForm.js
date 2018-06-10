import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default class CardBoardForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            card_name: '',
            card_description: '',
            list_id: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        const target = e.currentTarget;

        this.setState({
            [target.name]: (target.type === 'checkbox') ? target.checked : target.value
        });
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.board_lists !== this.props.board_lists) {
            const board_list = this.props.board_lists;
            const first_list = board_list?board_list[0]:'';
            this.setState({list_id:first_list.id});
        }
    }

    render() {
        const { createCard,
            invalid_card, toggleCollapse, list_info, board_lists } = this.props;
        
        return (
            <Form onSubmit={
                (event) => {
                    if (list_info) {
                        createCard(event, this.state, list_info.id, function(event){
                            toggleCollapse(event, "card");
                        });
                        
                    } else {
                        createCard(event, this.state, function(event){
                            toggleCollapse(event, "card");
                        });
                        this.setState({
                            card_name:'',
                            card_description: ''
                        });
                    }
                }
            }>
                <FormGroup row>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="list_id">Lista</Label>
                            <Input type="select" name="list_id" id="list_id"
                                onChange={this.handleChange}
                                value={this.state.list_id}
                            >
                            {board_lists !== undefined && board_lists.map(list => 
                                <option value={list.id} key={list.id}>{list.name}</option>
                            )} 
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="card_name">Nome</Label>
                            <Input type="text" name="card_name" id="card_name"
                                onChange={this.handleChange}
                                value={this.state.card_name}
                                placeholder="Nome do cartão" 
                                invalid={invalid_card}
                            />
                            <FormFeedback>
                                Este campo deve ter, no mínimo, 4 caracteres
                            </FormFeedback>
                        </FormGroup>
                    </Col>

                    <Col md={12}>
                        <FormGroup>
                            <Label for="card_description">Descrição</Label>
                            <Input type="textarea" name="card_description" id="card_description"
                                onChange={this.handleChange}
                                value={this.state.card_description}
                                placeholder="Descrição do cartão" 
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
                        this.props.toggleCollapse(event,"card")
                    }
                    
                }>Cancelar</Button>
            </Form>            
        )
    }
}