import { TEST, REMOVE } from './types'

export const test = () => {
  return {
    type: TEST,
  }
}

export const removeSong = id => {
  return {
    type: REMOVE,
    payload: id
  }
}