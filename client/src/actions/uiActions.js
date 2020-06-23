import { TOGGLE_ERROR, SET_MESSAGE } from './types'

export const toggleError = () => {
  return {
    type: TOGGLE_ERROR
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