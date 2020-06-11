import { TEST } from '../actions/types'

const initialState = {
  test: false
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TEST:
      console.log('in the song reducer')
      return {
        ...state,
        test: true
      }
    default:
      return state
  }
}