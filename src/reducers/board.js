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
        case "BOARD-CREATE":
            const board = action.board;
            const boards_state = state.boards.concat(board);
            const actual_state = state;

            actual_state['boards'] = boards_state;

            return actual_state;
        case "BOARD-DELETE":
            const board_id = action.board_id;
            const actual_boards = state.boards.filter(function(item){
                return item.id !== board_id
            });
            const boards_after = state;
            
            boards_after['boards'] = actual_boards;

            return boards_after;
        case "BOARD-FIND":
            const board_find = action.board;
            const board_info = [];
            board_info['board_info'] = board_find;

            const state_info = Object.assign({}, state, board_info);

            return state_info;
        case "BOARD-UPDATE":
            const board_updated = action.board;
            const board_list = state.boards;

            const updated_list = 
                board_list.map(item => item.id === board_updated.id?board_updated:item);

            const state_updated = state;
            state_updated['boards'] = updated_list;

            return state_updated;
        case "LIST-CREATE":
            const state_create = state;
            const new_item = action.list;
            const card_object = {
                id: 99999, 
                name: 'Card de exemplo, apenas ilustrativo',
                dateLastActivity: '0000-00-00T00:00:00.166Z'
            };
            new_item['cards'] = [
                card_object
            ];

            const list_create = state.board_lists.concat(new_item);
            state_create['board_lists'] = list_create;

            console.log(state_create);

            return state_create;
        default:
            // console.log("break");
            break;
    }

    return state;
}