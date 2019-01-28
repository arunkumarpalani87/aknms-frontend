import { combineReducers } from 'redux';
import { eventChartReducer } from './eventChartReducer';
import { eventTableReducer } from './eventTableReducer';
// import { infiniteTableReducer } from './infiniteTableReducer';

export default combineReducers({
  eventChartReducer,
  eventTableReducer
})