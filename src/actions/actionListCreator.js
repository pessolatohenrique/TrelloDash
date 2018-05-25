export function create(list) {
    return { type: 'LIST-CREATE', list};
}

export function find(fields) {
    return { type: 'LIST-FIND', fields};
}

export function update(fields, list_id) {
    return { type: 'LIST-UPDATE', fields, list_id};
}