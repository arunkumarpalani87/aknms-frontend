import { combineReducers } from 'redux';
import infiniteTableReducer from './infiniteTableReducer';
import loginReducer from './loginReducer';
const rootReducer = combineReducers({
  
  loginReducer,infiniteTableReducer
})
export default rootReducer;