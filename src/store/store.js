import {createStore} from "redux";
// import rootReducer from "../reducers/reducer.js";
import infinteTableReducer from '../reducers/infiniteTableReducer.js';

const store = createStore(infinteTableReducer);
// const store = createStore(rootReducer);

export default store;