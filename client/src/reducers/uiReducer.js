import { TOGGLE_ERROR, SET_MESSAGE, CLEAR_MESSAGE } from '../actions/types'

const initialState = {
  error: false,
  errorMessage: null,
  message: null
}

export default function(state = initialState, action){
  switch(action.type){
    case TOGGLE_ERROR:
      return {
        ...state,
        error: !state.error,
        errorMessage: action.payload
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