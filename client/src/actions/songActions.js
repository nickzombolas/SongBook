import axios from 'axios'
import {
  REMOVE,
  CHANGE_STATUS,
  GET_SONGS,
  ADD_NEW_SONG,
  REMOVE_USER_SONG,
  ADD_NEW_USER_SONG,
  CHANGE_USER_STATUS
  } from './types'

export const getSongs = (userSongs) => dispatch => { //NEED TO CHANGE backend
  let songs = []
  userSongs.forEach(song => {
    songs.push(song._id)
  })
  axios.get('/api/songs', {
    params: {
      songs
    }
  }).then(res => {
    let songsWithStatus = res.data
    songsWithStatus.forEach(song => {
      userSongs.forEach(userSong => {
        if(song._id === userSong._id)
          song.status = userSong.status
      })
    })
    dispatch({
      type: GET_SONGS,
      payload: res.data
    })
  }).catch(err => console.log(err))
}

export const removeSong = id => dispatch =>{
  axios.delete(`/api/songs/${id}`).then(res => {
    dispatch({
      type: REMOVE,
      payload: res.data.id
    })
    dispatch({
      type: REMOVE_USER_SONG,
      payload: res.data.id
    })
  })
}

// Change the status of a user's song.
// if undefined, remove from user's list
export const changeStatus = (songID, userID, status) => dispatch => {
  axios.post(`/api/songs/${songID}`, { status, userID }).then(res => {
    dispatch({
      type: CHANGE_STATUS,
      payload: {
        id: songID,
        status: res.data.status
      }
    })
    dispatch({
      type: CHANGE_USER_STATUS,
      payload: {
        id: songID,
        status: res.data.status
      }
    })
  })
}

// Add new song to the db
export const addNewSong = song => dispatch => {
  axios.post('/api/songs', { song }).then(res => {
    dispatch({
      type: ADD_NEW_SONG,
      payload: song
    })
    dispatch({
      type: ADD_NEW_USER_SONG,
      payload: song
    })
  })
}