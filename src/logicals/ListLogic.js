import { create } from '../actions/actionListCreator';

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
        .then(response => response.json())
        .then(result => {
            result.idBoard = board_id;
            store.dispatch(create(result));
        })
        .catch(error => {
            console.log(error);
        });
    }

}
