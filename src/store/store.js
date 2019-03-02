import {createStore} from "redux";
import rootReducer from "../reducers/reducer.js";
const store = createStore(rootReducer);
console.log("testing store state",store);
export default store;