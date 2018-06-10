import { create, find, update } from '../actions/actionListCreator';
import { createToast } from '../common/ToastHelper';
import { showError, catchError } from '../common/ErrorHelper';

/**
 * classe contendo lógicas relacionadas a um Board
 */
export default class ListLogic {
    /**
     * realiza a criação de uma nova lista
     * @param {*} store 
     * @param {Object} fields objeto descrevendo campos e respectivos valores 
     * @param {String} board_id ID de um quadro
     */
    static create(store, fields, board_id) {
        const key = sessionStorage.getItem("key");
        const token = sessionStorage.getItem("token");

        const headers = {
            method: "POST",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/lists?name=${fields.list_name}&idBoard=${board_id}&key=${key}&token=${token}`, headers)
        .then(response => {
            catchError(response);
            return response.json();
        })
        .then(result => {
            result.idBoard = board_id;
            store.dispatch(create(result));
            createToast("Lista adiciona com sucesso!");
        })
        .catch(error => {
            showError(error);
        });
    }

    /**
     * realiza o preenchimento de estado referente a uma lista
     * @param {*} store 
     * @param {Object} fields objeto descrevendo campos e respectivos valores 
     */
    static find(store, fields) {
        store.dispatch(find(fields));
    }

    /**
     * realiza a atualização de uma lista, de acordo com os campos e o ID
     * @param {*} store 
     * @param {Object} fields campos atualizados 
     * @param {String} list_id ID da lista
     */
    static update(store, fields, list_id) {
        const key = sessionStorage.getItem("key");
        const token = sessionStorage.getItem("token");

        const headers = {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/lists/${list_id}?name=${fields.list_name}&key=${key}&token=${token}`, headers)
        .then(response => {
            catchError(response);
            return response.json()
        })
        .then(result => {
            result.idBoard = fields.idBoard;
            result.cards = fields.cards;
            store.dispatch(update(result, list_id));
            createToast("Lista atualizada com sucesso!");
        })
        .catch(error => {
            showError(error);
        });
    }

}
