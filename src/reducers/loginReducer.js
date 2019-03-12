function loginReducer(state = {
    username: '',
    loggedin: false
}, action) {
    console.log("login Reducer Action", action);
    switch (action.type) {
        case 'LOGIN':
            console.log("Reducer table Mount - Curr State", state);
            console.log("Reducer table Mount - Action username", action.username);
            return {
                username: action.username,
                loggedin: true
            }
        case 'CLEAR_DATA':
            console.log("Reducer table Mount - Curr State", state);
            console.log("Reducer table Mount - Action username", action.username);
            return {
                username: '',
                loggedin: false
            }
        default:
            return state;
    }
};

export default loginReducer;
