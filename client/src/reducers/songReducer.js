import { TEST, REMOVE } from '../actions/types'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'

const initialState = {
  test: false,
  songs: [
    {
      _id: 1,
      title: 'testTitle1',
      composer: 'TestComposer1',
      status: WANT_TO_LEARN,
    },
    {
      _id: 2,
      title: 'testTitle2',
      composer: 'TestComposer2',
      status: LEARNING
    },
    {
      _id: 3,
      title: 'testTitle3',
      composer: 'TestComposer3',
      status: LEARNED
    },
    {
      _id: 4,
      title: 'title',
      composer: 'composer',
      status: WANT_TO_LEARN
    },
    {
      _id: 5,
      title: 'title',
      composer: 'Composer',
      status: LEARNING
    },
    {
      _id: 6,
      title: 'Title',
      composer: 'composer',
      status: LEARNED
    },
    {
      _id: 7,
      title: 'Title',
      composer: 'Composer',
      status: WANT_TO_LEARN
    },
  ]
}

export default function(state = initialState, action) {
  switch(action.type) {
    case TEST:
      return {
        ...state,
        test: true
      }
    case REMOVE:
      return {
        ...state,
        songs: state.songs.filter(song => song._id !== action.payload)
      }
    default:
      return state
  }
}