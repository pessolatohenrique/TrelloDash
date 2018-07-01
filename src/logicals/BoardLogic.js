import { listBoard, getCards, 
    createBoard, deleteBoard, findBoard, updateBoard, getLabels,
    getMostBoards } 
from '../actions/actionCreator';

import { createToast } from '../common/ToastHelper';
import { showError, catchError } from '../common/ErrorHelper';
import { getAuthParameters } from '../common/AuthHelper';
import CardLogic from './CardLogic';

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

        fetch(`https://api.trello.com/1/boards/?${getAuthParameters()}`, headers)
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
        fetch(`https://api.trello.com/1/boards/${board_id}?${getAuthParameters()}`)
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
        const headers = {
            method: "PUT",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/boards/${board_id}?name=${fields.board_name}&${getAuthParameters()}`, headers)
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
        const headers = {
            method: "DELETE",
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }

        fetch(`https://api.trello.com/1/boards/${board_id}/?${getAuthParameters()}`, headers)
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
     * @return { Object } objeto promise
     */
    static list(store) {
        const promise = new Promise(function(resolve, reject){
            //"userdash" é o ID do time
            fetch(`https://api.trello.com/1/organizations/userdash/boards?${getAuthParameters()}`)
            .then(response => {
                catchError(response);
                return response.json()
            })
            .then(result => {
                store.dispatch(listBoard(result));
                resolve(result);
            })
            .catch(error => {
                showError(error);
            })
        });

        return promise;
    }

    /**
     * retorna as listas de um quadro
     * @param {*} store 
     * @param {String} shortLink link curto para a API do trello realizar a busca
     * @param {Object} callback função que será executada após processamento
     */
    static getBoardList(shortLink) {     
        let promise = new Promise(function(resolve, reject) {
            fetch(`https://api.trello.com/1/boards/${shortLink}/lists?${getAuthParameters()}`)
            .then(response => {
                catchError(response);
                return response.json();
            })
            .then(result => {
                resolve(result);
            })
            .catch(error => {
                showError(error);
            })
        });

        return promise;
    }

    /**
     * obtem os cards de acordo com o ID de uma lista
     * @param {*} store 
     * @param {Array} list informações de uma lista, principalmente o seu ID
     */
    static getCards(store, list) {
        list.map (item => {
            fetch(`https://api.trello.com/1/lists/${item.id}/cards?${getAuthParameters()}`)
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

    /**
     * obtem todas as etiquetas válidas dos quadros
     * @param {*} store 
     * @param { Array } boards quadros disponíveis 
     */
    static getLabels(store, boards) {
        const promise = new Promise(function (resolve, reject) {
            const final_labels = [];
        
            boards.map(item => {
                const labels = Object.entries(item.labelNames);
                labels.map(item => item[1] !== "" 
                    ?final_labels.push(item):'');

                return true;
            });
    
            store.dispatch(getLabels(final_labels));

            resolve(final_labels);
        });

        return promise;
    }

    /**
     * com base em uma lista de array com IDs de quadros
     * retorna os valores únicos, sem repetições
     * @param { Array } boards_ids lista com os IDs dos quadros
     * @return { Array } ids_unique lista com IDs únicos
     */
    static getUniqueIds(boards_ids) {
        const ids_unique = [];
        
        boards_ids.map(
            (value, index) => {
                if (boards_ids.indexOf(value) === index) {
                    const temp_object = {
                        board_id: value,
                        cards: []
                    };
                    ids_unique.push(temp_object);
                }
                return true;
            }
        );

        return ids_unique;
    }

    /**
     * obtem os quadros mais utilizados
     * ou seja, os quadros que mais possuem cards
     * @param {*} store 
     * @param {Array} cards lista com cartões encontrados
     * @param {Array} boards lista com informações gerais dos quadros
     * @return {Array} final_list lista com quadros mais utilizados 
     */
    static getMostUse(store, cards, boards) {
        const boards_ids = cards.map(item => item.idBoard);
        const ids_unique = this.getUniqueIds(boards_ids);

        const updated_ids = CardLogic.associateWithBoard(ids_unique, cards);

        updated_ids.sort(function(a, b){
            return b.cards.length - a.cards.length;
        });

        updated_ids.map((updated) => {
            boards.map((board, key) => {
                if (updated.board_id === board.id) {
                    updated.board_name = board.name;
                } 
                return true;
            })
            return true;
        });

        const filtered = updated_ids.filter(item => item.hasOwnProperty('board_name'));
        const final_filter = filtered.slice(0, 3);

        store.dispatch(getMostBoards(final_filter));        
    }
}
