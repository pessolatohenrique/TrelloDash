import {List} from 'immutable';

//Função redutora, ou seja REDUCER
export function board(state = new List(), action) {
    switch (action.type) {
        case "LIST":
            return new List(action.boards);
        default:
            // console.log("break");
            break;
    }

    return state;
}