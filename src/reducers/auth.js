import {List} from 'immutable';

export function auth (state = new List(), action) {
    switch (action.type) {
        case "LOGIN":
            return state;
        default:
            break;
    }

    return state;
}