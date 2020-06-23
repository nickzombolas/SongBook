import axios from 'axios'
import { REMOVE, CHANGE_STATUS, GET_SONGS, ADD_NEW_SONG } from './types'

export const getSongs = () => dispatch => {
  axios.get('/api/songs').then(res => {
    dispatch({
      type: GET_SONGS,
      payload: res.data
    })
  })
}

export const removeSong = id => dispatch =>{
  axios.delete(`/api/songs/${id}`).then(res => {
    dispatch({
      type: REMOVE,
      payload: res.data.id
    })
  })
}

export const changeStatus = (id, status) => dispatch => {
  axios.post(`/api/songs/${id}`, { status }).then(res => {
    dispatch({
      type: CHANGE_STATUS,
      payload: {
        id,
        status: res.data.status
      }
    })
  })
}

export const addNewSong = song => dispatch => {
  console.log('in actionnnnnnnnnnnnnn')
  console.log(song)
  axios.post('/api/songs', { song }).then(res => {
    dispatch({
      type: ADD_NEW_SONG,
      payload: song
    })
  })
}