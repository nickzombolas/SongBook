import { REMOVE, CHANGE_STATUS, ADD, GET_SONGS, ADD_NEW_SONG } from '../actions/types'

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
    case GET_SONGS:
      return {
        ...state,
        songs: action.payload
      }
    case ADD_NEW_SONG:
      return {
        ...state,
        songs: [action.payload.song, ...state.songs]
      }
    default:
      return state
  }
}