import { REMOVE, CHANGE_STATUS, ADD } from './types'

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

export const addToList = (song) => {
  return {
    type: ADD,
    payload: {
      song
    }
  }
}