export function eventTableReducer(state={isbn:undefined}, action){
    switch(action.type){
        case 'selected':
            return {
                isbn: action.isbn
            };
        default:
            return {
                isbn: undefined
            };
    }
};