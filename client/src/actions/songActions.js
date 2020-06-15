import { REMOVE, CHANGE_STATUS } from './types'

export const removeSong = id => {
  return {
    type: REMOVE,
    payload: id
  }
}

export const changeStatus = (id, status) => {
  return {
    type: CHANGE_STATUS,
    payload: {
      id,
      status
    }
  }
}