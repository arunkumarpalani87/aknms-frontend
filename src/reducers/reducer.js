import { combineReducers } from 'redux';
import infiniteTableReducer from './infiniteTableReducer';
import loginReducer from './loginReducer';
const rootReducer = combineReducers({

  infiniteTableReducer,loginReducer
})
export default rootReducer;