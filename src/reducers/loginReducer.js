function loginReducer(state = {
    username: ''
}, action) {
    console.log("login Reducer Action", action);
    switch (action.type) {
        case 'LOGIN':
            console.log("Reducer table Mount - Curr State", state);
            console.log("Reducer table Mount - Action rowdata", action.rowdata);
            return {
                username: action.username,
            }
        default:
            return state;
    }
};

export default loginReducer;
