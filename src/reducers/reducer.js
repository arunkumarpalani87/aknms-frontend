import { combineReducers } from 'redux';
import { loginReducer } from './loginReducer';
import { infiniteTableReducer } from './infiniteTableReducer';

export default combineReducers({
  loginReducer,
  infiniteTableReducer