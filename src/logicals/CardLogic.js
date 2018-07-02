import { create, deleteCard, find, update, getCardsByUser,
    calculateTotalByList, groupLabels 
} from '../actions/actionCardCreator';
import { getLabels } from '../actions/actionCreator';
import { createToast } from '../common/ToastHelper';
import { showError, catchError } from '../common/ErrorHelper';
import { getAuthParameters } from '../common/AuthHelper';

/**
 * classe contendo lógicas relacionadas a um Card
 */
export default class CardLogic {
    /**
     * realiza a criação de uma nova lista
     * @param {*} store 
     * @param {Object} fields objeto descrevendo campos e respectivos valores 
     */
    static create(store, fields) {
        const headers = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/cards?name=${fields.card_name}&idList=${fields.list_id}&desc=${fields.card_description}&${getAuthParameters()}`, headers)
        .then(response => {
            catchError(response);
            return response.json();
        })
        .then(result => {
            store.dispatch(create(result));
            createToast("Card adicionado com sucesso!");
        })
        .catch(error => {
            showError(error);
        });
    }

    /**
     * realiza o preenchimento de estado referente a uma card
     * @param {*} store 
     * @param {Object} fields objeto descrevendo campos e respectivos valores 
     */
    static find(store, fields) {
        store.dispatch(find(fields));
    }

    /**
     * realiza a exclusão de um card, com base em seu ID
     * o ID da lista é utilizado para facilitar busca no Array
     * @param {*} store 
     * @param {String} card_id ID do card a ser procurado 
     * @param {String} list_id ID da lista
     */
    static delete(store, card_id, list_id) {
        const headers = {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/cards/${card_id}?closed=true&${getAuthParameters()}`, headers)
        .then(response => {
            catchError(response);
            return response.json();
        })
        .then(result => {
            store.dispatch(deleteCard(card_id, list_id));
            createToast("Card arquivado com sucesso!");
        })
        .catch(error => {
            showError(error);
        });
    }
    
    /**
     * realiza a atualização de um card de acordo com os campos e o seu ID
     * @param {*} store
     * @param {Object} fields campos a serem atualizados
     * @param {String} card_id ID do card a ser atualizado
     */
    static update(store, fields, card_id) {
        const headers = {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/cards/${card_id}?idList=${fields.list_id}&name=${fields.card_name}&desc=${fields.card_description}&${getAuthParameters()}`, headers)
        .then(response => {
            catchError(response);
            return response.json();
        })
        .then(result => {
            store.dispatch(update(result, card_id));
            createToast("Card atualizado com sucesso!");
        })
        .catch(error => {
            showError(error);
        });
    }

    /**
     * realiza a listagem de todos os cards do usuário logado
     */
    static listFromUser(store) {
        const promise = new Promise(function(resolve, reject) {
            const username = localStorage.getItem('username');
            fetch(`https://api.trello.com/1/members/${username}/cards?fields=id,name,idBoard&${getAuthParameters()}`)
            .then(response => {
                catchError(response);
                return response.json();
            })
            .then(result => {
                store.dispatch(getCardsByUser(result));
                resolve(result);
            })
            .catch(error => {
                showError(error);
            });
        });

        return promise;
    }

    /**
     * utilizado para cards que são buscados sem associação direta do quadro
     * a ideia é agrupar os cards por quadro
     * @param {Array} ids_unique IDs dos quadros 
     * @param {Array} cards lista de quadros encontrados
     * @return {Array} uniques lista de quadros com cards associados 
     */
    static associateWithBoard(ids_unique, cards) {
        const uniques = ids_unique;
        uniques.map(unique => {
            cards.map(card => {
                if (unique.board_id === card.idBoard) {
                    unique.cards.push(card);    
                }
                return true;
            })

            return true;
        });

        return uniques;
    }

    /**
     * realiza o mapeamento de totais de acordo com as listas enviadas por parâmetro
     * @param {*} store 
     * @param {Array} lists listas encontradas
     */
    static mapTotalByList(store, lists) {
        const promise = new Promise(function(resolve, reject) {
            const array_chart = [];
            array_chart.push(['Lista', 'Total de Cartões']);
    
            if (lists) {
                lists.map(item => {
                    const tmp_array = [item.name, item.cards.length];
                    array_chart.push(tmp_array);
                    return true;
                })
    
                store.dispatch(calculateTotalByList(array_chart));
                resolve(array_chart);
            }
        })

        return promise;
    }

    /**
     * realiza a unção de todos os cards, nos quais estavam agrupados em listas
     * @param {*} store
     * @param {Array} lists listas encontradas
     */
    static joinCards(store, lists) {
        const promise = new Promise(function(resolve, reject) {
            const array_cards = [];
    
            if (lists) {
                lists.map(item => {
                    const cards = item.cards;
                    cards.map(card => {
                        array_cards.push(card);
                        return true;
                    })
                    
                    return true;
                })
                
                store.dispatch(getCardsByUser(array_cards));
                resolve(array_cards);
            }
        })

        return promise;
    }

    /**
     * realiza a contagem de labels de cartões, para um quadro específico
     * @param {Array} boards lista de quadros
     * @param {String} board_id ID do quadro selecionado
     */
    static countLabels(store, boards, board_id, cards) {
        const board_find = boards.find(item => item.shortLink === board_id);
        const board_labels = Object.entries(board_find.labelNames);
        const valid_labels = board_labels.filter(item => item[1] !== "");
        const final_array = [];

        final_array.push(["Etiqueta", "Total"]);
        store.dispatch(getLabels(valid_labels));

        valid_labels.map(label => {
            const tmp_array = [];
            let total = 0;
            cards.map(card => {
                const labels_card = card.labels;
                labels_card.map(labelcard => {
                    if (labelcard.name === label[1]) {
                        total++;
                    }
                    return true;
                })
                return true;
            })
            tmp_array[0] = label[1];
            tmp_array[1] = total;
            final_array.push(tmp_array);
            return true;
        });

        store.dispatch(groupLabels(final_array));
    }
}
