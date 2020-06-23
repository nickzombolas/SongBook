import { TOGGLE_ERROR, SET_MESSAGE, CLEAR_MESSAGE } from './types'

export const toggleError = () => {
  return {
    type: TOGGLE_ERROR
  }
}

export const clearMessage = () => {
  return {
    type: CLEAR_MESSAGE
  }
}

export const setMessage = (title, status) => {
  return {
    type: SET_MESSAGE,
    payload: {
      message: `'${title}' has been added to '${status}' list!`
    }
  }
}

export const displayMessage = (title, status) => {
  return (dispatch) => {
    dispatch(setMessage(title, status))
    setTimeout(() => dispatch(clearMessage()),
      3000
    )
  }
}