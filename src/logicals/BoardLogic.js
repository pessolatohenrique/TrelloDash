import { listBoard } from '../actions/actionCreator';

export default class BoardLogic {
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
}
