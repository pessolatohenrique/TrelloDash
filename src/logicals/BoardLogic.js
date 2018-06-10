import { listBoard, getBoardList, getCards, 
    createBoard, deleteBoard, findBoard, updateBoard } 
from '../actions/actionCreator';

import { createToast } from '../common/ToastHelper';
import { showError, catchError } from '../common/ErrorHelper';

/**
 * classe contendo lógicas relacionadas a um Board
 */
export default class BoardLogic {
    /**
     * realiza a criação de um novo quadro
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
            }),
            body: JSON.stringify({
                name: fields.board_name,
                defaultLabels: fields.default_label,
                defaultLists: fields.default_list,
                prefs_background: fields.background_color,
                prefs_permissionLevel: "public"
            })
        }

        fetch(`https://api.trello.com/1/boards/?key=${key}&token=${token}`, headers)
        .then(response => {
            catchError(response);
            return response.json();
        })
        .then(board => {
            board.shortLink = board.id;
            store.dispatch(createBoard(board));
            createToast("Quadro criado com sucesso!");
        })
        .catch(error => {
            showError(error);
        });
    }

    /**
     * encontra informações gerais de um quadro, de acordo com o seu ID
     * @param {*} store 
     * @param {String} board_id ID a ser pesquisado 
     */
    static find(store, board_id) {
        fetch(`https://api.trello.com/1/boards/${board_id}`)
        .then(response => response.json())
        .then(result => {
            store.dispatch(findBoard(result));
        })
    }

    /**
     * realiza a atualização de um quadro, de acordo com campos e ID
     * @param {*} store 
     * @param {Object} fields campos a serem atualizados
     * @param {String} board_id ID a ser atualizado 
     */
    static update(store, fields, board_id) {
        const key = sessionStorage.getItem("key");
        const token = sessionStorage.getItem("token");

        const headers = {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/boards/${board_id}?name=${fields.board_name}&key=${key}&token=${token}`, headers)
        .then(response => {
            catchError(response);
            return response.json();
        })
        .then(board => {
            board.shortLink = board.id;
            store.dispatch(updateBoard(board));
            createToast("Quadro atualizado com sucesso!");
        })
        .catch(error => {
            showError(error);
        });
    }

    /**
     * realiza a exclusão de um quadro de acordo com o ID
     * @param {*} store 
     * @param {String} board_id ID do board, fornecido pelo Trello 
     */
    static delete(store, board_id) {
        const key = sessionStorage.getItem("key");
        const token = sessionStorage.getItem("token");

        const headers = {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/boards/${board_id}/?key=${key}&token=${token}`, headers)
        .then(response => {
            catchError(response);
            return response.json()
        })
        .then(board => {
            store.dispatch(deleteBoard(board_id));
            createToast("Quadro excluído com sucesso!");
            
        })
        .catch(error => {
            showError(error);
        });
    }

    /**
     * realiza a listagem de quadros para um usuário
     * para que a API retorne, o quadro deve ser público
     * @param {*} store 
     */
    static list(store) {
        fetch('https://api.trello.com/1/members/pessolatohenrique/boards')
        .then(response => response.json())
        .then(result => {
            store.dispatch(listBoard(result));
        })
        .catch(error => {
            console.log(error);
        })
    }

    /**
     * retorna as listas de um quadro
     * @param {*} store 
     * @param {String} shortLink link curto para a API do trello realizar a busca
     * @param {Object} callback função que será executada após processamento
     */
    static getBoardList(store, shortLink, callback) {
        fetch(`https://api.trello.com/1/boards/${shortLink}/lists`)
        .then(response => {
            catchError(response);
            return response.json();
        })
        .then(result => {
            callback(result, store);
        })
        .catch(error => {
            showError(error);
        })
    }

    /**
     * obtem os cards de acordo com o ID de uma lista
     * @param {*} store 
     * @param {Array} list informações de uma lista, principalmente o seu ID
     */
    static getCards(store, list) {
        list.map (item => {
            fetch(`https://api.trello.com/1/lists/${item.id}/cards`)
            .then(response => response.json())
            .then(cards => {
                store.dispatch(getCards(item, cards));
            })
            .catch(error => {
                console.log(error);
            });

            return true;
        });
    }
}
