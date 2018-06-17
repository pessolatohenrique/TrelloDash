import React, { Component } from 'react';
import { Badge, Card, CardText, CardBody,
    CardTitle, CardSubtitle, Button } from 'reactstrap';
import { convertToBrazilian } from './DateHelper';

export default class CardBoard extends Component {
    /**
     * verifica a descrição a ser informada
     * método utilizado diretamente pela view
     * @param {String} description
     * @return {String} message mensagem a ser apresentada 
     */
    showDescription(description) {
        let message = description === ""?"Descrição não informada":description;
        return message;
    }

    /**
     * caso existir labels, realiza a exibição destes
     * por meio de cores
     * @param {Array} labels lista com as labels anexadas a um quadro 
     */
    showLabels(labels) {
        return labels && labels.map(label =>
            <Badge color={label.color} className="badge-card" key={label.id}>
                {label.name}
            </Badge>
        );
    }

    showDate(txt_date) {
        const converted_txt = convertToBrazilian(txt_date);
        return converted_txt;
    }

    render() {
        const { card, deleteCard, findCard } = this.props;

        return (
            <div className="board-card">
                <Card>
                    <CardBody>
                        <CardTitle>{card.name}</CardTitle>
                        <CardSubtitle>
                        {this.showLabels(card.labels)}
                        </CardSubtitle>
                        <CardText>
                            {this.showDescription(card.desc)}
                        </CardText>

                        <CardText>
                            <small className="text-muted">
                                Atualizado em {this.showDate(card.dateLastActivity)}
                            </small>
                        </CardText>
                        <Button color="primary" className="space-button"
                            onClick={() => findCard(card)}
                            >
                            Atualizar
                        </Button>
                        <Button type="button" color="danger" 
                            onClick={() => {deleteCard(card.id, card.idList)}}>
                            Excluir
                        </Button>
                    </CardBody>
                </Card>
            </div>
        );
    }
}