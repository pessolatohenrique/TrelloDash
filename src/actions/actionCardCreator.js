export function create(card) {
    return { type: 'CARD-CREATE', card};
}

export function find(fields) {
    // return { type: 'LIST-FIND', fields};
}

export function update(fields, list_id) {
    // return { type: 'LIST-UPDATE', fields, list_id};
}