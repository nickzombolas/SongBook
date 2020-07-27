import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  REMOVE_USER_SONG,
  CHANGE_USER_STATUS,
  ADD_NEW_USER_SONG
} from '../actions/types'

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  isLoading: false,
  user: null
}

export default function(state = initialState, action) {
  switch(action.type) {
    case USER_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case USER_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        isLoading: false,
        user: action.payload
      }
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('token', action.payload.token)
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        isLoading: false
      }
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('token')
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        isLoading: false
      }
    case REMOVE_USER_SONG:
      return {
        ...state,
        user: {
          ...state.user,
          songs: state.user.songs.filter(song => song._id !== action.payload)
        }
      }
    case CHANGE_USER_STATUS:
      let currentSongs = state.user.songs.filter(song => song._id !== action.payload._id)
      const changedSong = {
        _id: action.payload._id,
        status: action.payload.status
      }
      const songs = [changedSong, ...currentSongs]
      return {
        ...state,
        user: {
          ...state.user,
          songs
        }
      }
      case ADD_NEW_USER_SONG:
        return {
          ...state,
          user: {
            ...state.user,
            songs: state.user.songs.length < 1 ? [action.payload.song] : [action.payload.song, ...state.user.songs]
          }
        }
    default:
      return state
  }
}