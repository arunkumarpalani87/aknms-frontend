import { combineReducers } from 'redux'
import {eventChartReducer} from './eventChartReducer'
import {eventTableReducer} from './eventTableReducer'

export default combineReducers({
    eventChartReducer,
  eventTableReducer
})