export function create(card) {
    return { type: 'CARD-CREATE', card};
}

export function find(fields) {
    return { type: 'CARD-FIND', fields};
}

export function update(fields, card_id) {
    return { type: 'CARD-UPDATE', fields, card_id};
}

export function deleteCard(card_id, list_id) {
    return { type: 'CARD-DELETE', card_id, list_id};
}

export function getCardsByUser(cards) {
    return {type: 'ALL-CARDS', cards};
}