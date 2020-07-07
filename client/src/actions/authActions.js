import axios from 'axios'

import {
  USER_LOADING,
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS
} from './types'
import { toggleError } from './uiActions'

export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

// Create Account
export const createAccount = (user) => (dispatch, getState) => {
  axios.post('api/users', user).then(res => {
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    })
  }).catch(err => {
    console.log('ERROR: ' + err.response.data.message)
    if(!getState().ui.error)
      dispatch(toggleError(err.response.data.message))
      setTimeout(() => dispatch(toggleError()),
      3000
    )
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
    dispatch(toggleError(err.response.data.message))
    console.log('ERROR: ' + err.response.data.message)
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