import { REMOVE } from './types'

export const removeSong = id => {
  return {
    type: REMOVE,
    payload: id
  }
}