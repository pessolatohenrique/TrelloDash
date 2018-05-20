import {List} from 'immutable';

/**
 * verifica as listas (relacionadas a um quadro) acumuladas
 * de modo a trazer somente as listas referentes aquele quadro
 * @param {Object} state o estado atual 
 * @param {Object} list informação da lista (de um quadro) atual
 * @return {Array} cards_object estado final
 */
function verifyAccumulateList(state, list) {
    const boards = [];
    const board_list = [];
    boards['boards'] = state.boards;

    const previous_board = state.board_lists;
    const board_id = list.idBoard;
    previous_board.push(list);
    const list_filter = previous_board.filter(function(item) {
        return item.idBoard === board_id;
    });
    board_list['board_lists'] = list_filter;
    const cards_object = Object.assign({}, boards, board_list);

    return cards_object;
}

//Função redutora, ou seja REDUCER
export function board(state = new List(), action) {
    switch (action.type) {
        case "LIST":
            let array = [];
            array['boards'] = action.boards;

            return array;
        case "BOARD-LIST":
            let array_board = [];
            array_board['board_lists'] = action.lists;
            const new_object = Object.assign({}, state, array_board);

            return new_object;
        case "CARD-LIST":
            const list = action.list;
            const array_cards = [];
            list['cards'] = action.cards;
            array_cards['board_lists'] = []; 
            array_cards['board_lists'].push(list);

            if (state.board_lists) {
                const cards_object = verifyAccumulateList(state, list);
                return cards_object;
            }

            const cards_object = Object.assign({}, state, array_cards);

            return cards_object;
        default:
            // console.log("break");
            break;
    }

    return state;
}