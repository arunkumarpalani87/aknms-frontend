import { combineReducers } from 'redux';
import infiniteTableReducer from './infiniteTableReducer';
const rootReducer = combineReducers({
  table: infiniteTableReducer
})
export default rootReducer;