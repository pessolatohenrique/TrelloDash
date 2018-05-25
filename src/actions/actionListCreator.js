export function create(list) {
    return { type: 'LIST-CREATE', list};
}

export function find(fields) {
    return { type: 'LIST-FIND', fields};
}