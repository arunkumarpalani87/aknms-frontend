function infiniteTableReducer(state = {
    rowdata : [],
    lastLoadedIndex : 0
}, action) {
    console.log("Reducer Action", action);
    switch(action.type) {
        case 'LOAD_DATA' :
            console.log("Reducer table Mount - Curr State", state);
            console.log("Reducer table Mount - Action rowdata", action.rowdata);
            return {
                rowdata : action.rowdata,
                lastLoadedIndex : action.lastLoadedIndex
            }
        default :
            console.log("Reducer table Mount - default State", state);

            return state;
    }
};

export default infiniteTableReducer;
