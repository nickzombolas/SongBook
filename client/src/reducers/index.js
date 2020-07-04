import { combineReducers } from 'redux'
import songReducer from './songReducer'
import uiReducer from  './uiReducer'
import authReducer from  './authReducer'

export default combineReducers({
  song: songReducer,
  ui: uiReducer,
  auth: authReducer
})