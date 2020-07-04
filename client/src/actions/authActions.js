import axios from 'axios'

import {
  USER_LOADING,
  USER_LOADED
} from './types'

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  axios.get('/api/auth/user', tokenConfig(getState)).then(res => {
    dispatch({
      type: USER_LOADED,
      payload: res.data
    })
  }).catch(err => {
    console.log('AUTH ERROR from auth actions')
    console.log(err)
  })
}

export const tokenConfig = getState => {
  const token = getState().auth.token
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  if(token) 
    config.headers['x-auth-token'] = token
  return config
}