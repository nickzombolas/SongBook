import { combineReducers } from 'redux'
import songReducer from './songReducer'
import uiReducer from  './uiReducer'

export default combineReducers({
  song: songReducer,
  ui: uiReducer
})