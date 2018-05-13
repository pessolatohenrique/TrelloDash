import { listBoard, getBoardList } from '../actions/actionCreator';

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
     */
    static getBoardList(store, shortLink) {
        fetch(`https://api.trello.com/1/boards/${shortLink}/lists`)
        .then(response => response.json())
        .then(result => {
            store.dispatch(getBoardList(result));
        })
        .catch(error => {
            console.log(error);
        })
    }
}
