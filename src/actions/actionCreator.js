export function listBoard(boards) {
    return {type:'LIST', boards: boards};
}

export function getBoardList(lists) {
    return {type: 'BOARD-LIST', lists: lists};
}

export function getCards (list, cards) {
    return {type: 'CARD-LIST', list, cards};
}

export function createBoard (board) {
    return {type: 'BOARD-CREATE', board};
}

export function deleteBoard(board_id) {
    return {type: 'BOARD-DELETE', board_id};
}

export function findBoard(board) {
    return {type: 'BOARD-FIND', board};
}

export function updateBoard(board) {
    return {type: 'BOARD-UPDATE', board};
}

export function getLabels(labels) {
    return {type: 'ALL-LABELS', labels};
}

export function getMostBoards(boards) {
    return {type: 'MOST-BOARDS', boards};
}