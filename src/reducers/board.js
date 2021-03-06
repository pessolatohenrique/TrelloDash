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

            return state_create;
        case "LIST-FIND":
            const state_find = state;
            state_find['list_info'] = action.fields;
            
            return state_find;
        case "LIST-UPDATE":
            const state_to = state;
            const state_lists = state.board_lists;
            const list_id = action.list_id;

            const update_list = state_lists.map(item => item.id === list_id
                ?action.fields:item);

            state_to['board_lists'] = update_list;
            
            return state_to;
        case "CARD-CREATE":
            const state_card = state;
            const card = action.card;
            const board_cards = state_card.board_lists;

            const belongs_to = board_cards.findIndex(function(element, index, array) {
                return card.idList === element.id;
            });

            if (belongs_to !== -1) {
                const new_card = board_cards[belongs_to].cards.concat(card);
                board_cards[belongs_to].cards = new_card;
            }

            state_card['board_lists'] = board_cards;
            return state_card;
        case "CARD-DELETE":
            const state_delete = state;
            
            const list_delete = state_delete.board_lists
                .find((item) => item.id === action.list_id);
            const index_list = state_delete.board_lists
                .findIndex((item) => item.id === action.list_id);
            const cards_delete = list_delete.cards
                .filter((item) => item.id !== action.card_id);

            list_delete.cards = cards_delete;

            state_delete.board_lists[index_list] = list_delete;
        
            return state_delete;
        case "CARD-FIND":
            const state_findcard = state;
            state_findcard['card_info'] = action.fields;

            return state_findcard;
        case "CARD-UPDATE":
            const state_cardup = state;
            const list_cardup = state_cardup.board_lists
                .find((item) => action.fields.idList === item.id);

            const card_update = list_cardup.cards.map(item => item.id === action.card_id
                ?action.fields:item);

            list_cardup.cards = card_update;

            const all_lists = state_cardup.board_lists.map(
                item => item.id === list_cardup.id?list_cardup:item
            );

            state_cardup['board_lists'] = all_lists;
            
            return state_cardup;
        default:
            break;
    }

    return state;
}