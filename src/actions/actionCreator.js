export function listBoard(boards) {
    return {type:'LIST', boards: boards};
}

export function getBoardList(lists) {
    return {type: 'BOARD-LIST', lists: lists};
}