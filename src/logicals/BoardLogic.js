import { listBoard, getBoardList, getCards } from '../actions/actionCreator';

/**
 * classe contendo lógicas relacionadas a um Board
 */
export default class BoardLogic {
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
        .then(response => response.json())
        .then(result => {
            callback(result, store);
        })
        .catch(error => {
            console.log(error);
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

        // store.dispatch(getCards(group_lists));
    }
}
