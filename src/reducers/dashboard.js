export function dashboard (state = [], action) {
    switch (action.type) {
        case "ALL-CARDS":
            const array_cards = [];
            array_cards['cards'] = action.cards;
            const all_cards = Object.assign(state, array_cards);

            return all_cards;
        case "ALL-LABELS":
            const array_labels = [];
            array_labels['labels'] = action.labels;
            const all_labels = Object.assign(state, array_labels);
                        
            return all_labels;
        case "MOST-BOARDS":
            const array_most = [];
            array_most['boards_most'] = action.boards;
            const most_boards = Object.assign(state, array_most);

            return most_boards;
        case "BOARD-SELECT":
            const array_select = [];
            array_select['boards_select'] = action.boards;
            const boards_select = Object.assign(state, array_select);

            return boards_select;
        case "TOTAL-LISTS":
            const array_total_lists = [];
            array_total_lists['cards_total'] = action.lists;
            const final_lists = Object.assign(state, array_total_lists);

            return final_lists;
        case "GROUP-LABELS":
            const array_total_labels = [];
            array_total_labels['labels_total'] = action.labels;
            const final_labels = Object.assign(state, array_total_labels);

            return final_labels;
        default:
            break;
    }

    return state;
}