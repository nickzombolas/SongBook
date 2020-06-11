import { TEST } from '../actions/types'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'

const initialState = {
  test: false,
  songs: [
    {
      title: 'testTitle1',
      composer: 'TestComposer1',
      status: WANT_TO_LEARN,
    },
    {
      title: 'testTitle2',
      composer: 'TestComposer2',
      status: LEARNING
    },
    {
      title: 'testTitle3',
      composer: 'TestComposer3',
      status: LEARNED
    },
  ]
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