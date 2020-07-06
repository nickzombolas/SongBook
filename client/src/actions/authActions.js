import axios from 'axios'

import {
  USER_LOADING,
  USER_LOADED,
  REGISTER_SUCCESS
} from './types'

// Create Account
export const createAccount = (user) => dispatch => {
  axios.post('api/users', user).then(res => {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  }).catch(err => {
    console.log('Register error')
    console.log(err)
  })
}

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  // If logged in get user info from db
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

//If logged in, add token to config object
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