import axios from 'axios'
import { REMOVE, CHANGE_STATUS, ADD, GET_SONGS } from './types'

export const getSongs = () => dispatch => {
  axios.get('/api/songs').then(res => {
    dispatch({
      type: GET_SONGS,
      payload: res.data
    })
  })
}

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