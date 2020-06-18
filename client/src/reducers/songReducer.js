import { REMOVE, CHANGE_STATUS, ADD, GET_SONGS } from '../actions/types'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'

const initialState = {
  songs: []
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
    case ADD:
      return {
        ...state,
        songs: [action.payload.song, ...state.songs]
      }
    case GET_SONGS:
      console.log(action.payload)
      return {
        ...state,
        //songs: [...state.songs, [action.payload]]
        songs: action.payload
      }
    default:
      return state
  }
}