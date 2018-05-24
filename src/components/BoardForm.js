import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormFeedback } from 'reactstrap';

export default class BoardForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            board_name: '',
            default_label: true,
            default_list: true,
            background_color: 'blue'
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
        const board_info = this.props.board_info;
        if (board_info) {
            this.setState({board_name:this.props.board_info.name});
        }
        
    }

    render() {
        const { createBoard, updateBoard,
            invalid_board, toggleCollapse, board_info } = this.props;

        return (
            <Form onSubmit={
                (event) => {
                    if (board_info) {
                        updateBoard(event, this.state, board_info.id, function(event){
                            toggleCollapse(event);
                        });
                        
                    } else {
                        createBoard(event, this.state, function(event){
                            toggleCollapse(event);
                        });
                        this.setState({
                            board_name:'',
                            default_label: true,
                            default_list: true,
                            background_color: 'blue'
                        });
                    }
                }
            }>
                <FormGroup row>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="name">Nome</Label>
                            <Input type="text" name="board_name" id="board_name"
                                onChange={this.handleChange}
                                value={this.state.board_name}
                                placeholder="Nome do quadro" 
                                invalid={invalid_board}/>
                            <FormFeedback>
                                Este campo deve ter, no mínimo, 4 caracteres
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="default_label">Label padrão?</Label>
                            <Input type="select" name="default_label" id="default_label"
                                onChange={this.handleChange}
                                value={this.state.default_label}
                                disabled={board_info?true:false}
                            >
                                <option value={true}>Sim</option>
                                <option value={false}>Não</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="default_list">Listas padrão?</Label>
                            <Input type="select" name="default_list" id="default_list"
                                onChange={this.handleChange}
                                value={this.state.default_list}
                                disabled={board_info?true:false}
                            >
                                <option value={true}>Sim</option>
                                <option value={false}>Não</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={3}>
                        <FormGroup>
                            <Label for="background_color">Cor do Quadro</Label>
                            <Input type="select" name="background_color" id="background_color"
                                onChange={this.handleChange}
                                value={this.state.background_color}
                                disabled={board_info?true:false}
                            >
                                <option value={"blue"}>Azul</option>
                                <option value={"sky"}>Azul Céu</option>
                                <option value={"grey"}>Cinza</option>  
                                <option value={"orange"}>Laranja</option>
                                <option value={"pink"}>Rosa</option>
                                <option value={"purple"}>Roxo</option>
                                <option value={"green"}>Verde</option>
                                <option value={"lime"}>Verde Limão</option>
                                <option value={"red"}>Vermelho</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </FormGroup>

                <Button color="info" className="btn-space">
                    {board_info?"Atualizar":"Adicionar"}
                </Button>
                <Button color="danger" onClick={this.props.toggleCollapse}>Cancelar</Button>
            </Form>            
        )
    }
}