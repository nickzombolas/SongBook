import { TOGGLE_ERROR, SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types'

const initialState = {
  error: false,
  message: null
}

export default function(state = initialState, action){
  switch(action.type){
    case TOGGLE_ERROR:
      return {
        ...state,
        error: !state.error
      }
    case SET_MESSAGE:
      return {
        ...state,
        message: action.payload.message
      }
    case CLEAR_MESSAGE:
      return {
        ...state,
        message: null
      }
    default:
      return {
        ...state
      }
  }
}