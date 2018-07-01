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
        default:
            break;
    }

    return state;
}