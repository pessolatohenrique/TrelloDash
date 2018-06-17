import { create, deleteCard, find, update } from '../actions/actionCardCreator';
import { createToast } from '../common/ToastHelper';
import { showError, catchError } from '../common/ErrorHelper';

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
        const key = sessionStorage.getItem("key");
        const token = sessionStorage.getItem("token");

        const headers = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/cards?name=${fields.card_name}&idList=${fields.list_id}&desc=${fields.card_description}&key=${key}&token=${token}`, headers)
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
        const key = sessionStorage.getItem("key");
        const token = sessionStorage.getItem("token");

        const headers = {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/cards/${card_id}?closed=true&key=${key}&token=${token}`, headers)
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
        const key = sessionStorage.getItem("key");
        const token = sessionStorage.getItem("token");

        const headers = {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/cards/${card_id}?idList=${fields.list_id}&name=${fields.card_name}&desc=${fields.card_description}&key=${key}&token=${token}`, headers)
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

}
