import React, { Component } from 'react';
import { Badge } from 'reactstrap';
import CardBoard from './CardBoard';

export default class List extends Component {
    showTotalCards(total) {
        let total_msg = total;
        if (total < 10) {
            total_msg = `0${total}`;
        }

        return total_msg;
    }
    render() {
        const { cards, findList, deleteCard, findCard } = this.props;

        return (
            cards.length > 0 &&
            <div className="board-list">
                <div className="row">
                    <div className="col-md-10">
                        <h4>
                            <a href="/link" className="link_editable"
                                onClick={(event) => {
                                        findList(event, this.props);
                                    }
                                }>
                                {this.props.name}
                            </a> 
                        </h4>
                    </div>
                    <div className="col-md-2">
                        <Badge color="primary" pill className="badge-title">
                            {this.showTotalCards(cards.length)} cards
                        </Badge>
                    </div>
                </div>

                <div className="row">
                    {cards.map(item =>
                        <div className="col-md-4" key={item.id}>
                            <CardBoard card={item} deleteCard={deleteCard}
                                findCard={findCard}
                                />
                        </div>
                    )}
                </div>
            </div>
        )
    }
}