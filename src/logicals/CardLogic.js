import { create } from '../actions/actionCardCreator';
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

}
