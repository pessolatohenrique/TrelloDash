import React, { Component } from 'react';
import { Badge, Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';

export default class CardBoard extends Component {
    render() {
        return (
            <div className="board-card">
                <Card>
                    <CardBody>
                        <CardTitle>Título da tarefa</CardTitle>
                        <CardSubtitle>
                            <Badge color="primary" className="badge-card">Tag 01</Badge>
                            <Badge color="secondary" className="badge-card">Tag 02</Badge>
                            <Badge color="success" className="badge-card">Tag 03</Badge>
                            <Badge color="danger" className="badge-card">Tag 04</Badge>
                        </CardSubtitle>
                        <CardText>
                            Criar com o script padrão de react e verificar dependências necessárias. Por exemplo: redux.
                        </CardText>

                        <CardText>
                            <small className="text-muted">Last updated 3 mins ago</small>
                        </CardText>
                        <Button color="primary" className="space-button">Atualizar</Button>
                        <Button color="danger">Excluir</Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}