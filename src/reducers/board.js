import {List} from 'immutable';

//Função redutora, ou seja REDUCER
export function board(state = new List(), action) {
    switch (action.type) {
        case "LIST":
            let array = [];
            array['boards'] = action.boards;
            // return new List(action.boards);
            return array;
        case "BOARD-LIST":
            let array_board = [];
            array_board['board_lists'] = action.lists;
            const new_object = Object.assign({}, state, array_board);

            return new_object;
        default:
            // console.log("break");
            break;
    }

    return state;
}