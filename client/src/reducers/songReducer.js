import { REMOVE, CHANGE_STATUS } from '../actions/types'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'

const initialState = {
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
    case REMOVE:
      return {
        ...state,
        songs: state.songs.filter(song => song._id !== action.payload)
      }
    case CHANGE_STATUS:
      let currentSongs = state.songs.filter(song => song._id !== action.payload.id)
      let changedSong = state.songs.filter(song => song._id === action.payload.id)[0]
      changedSong = {
        ...changedSong,
        status: action.payload.status
      }
      const songs = [changedSong, ...currentSongs]
      return {
        ...state,
        songs
      }
    default:
      return state
  }
}