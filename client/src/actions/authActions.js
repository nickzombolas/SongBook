import axios from 'axios'

import {
  USER_LOADING,
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGOUT_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR
} from './types'
import { toggleError } from './uiActions'

// User Logout
export const logout = () => {
  return {
    type: LOGOUT_SUCCESS
  }
}

// User Login
export const login = (email, password) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    const user = { email, password }
    axios.post('api/auth', user).then(res => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      resolve('okay')
    }).catch(err => {
      console.log('ERROR: ' + err.response.data.message)
      if (!getState().ui.error)
        dispatch(toggleError(err.response.data.message))
      setTimeout(() => dispatch(toggleError()),
        3000
      )
      reject('error')
    })
  })
}

// Create Account
export const createAccount = (user) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    axios.post('api/users', user).then(res => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      resolve('okay')
    }).catch(err => {
      console.log('ERROR: ' + err.response.data.message)
      if (!getState().ui.error)
        dispatch(toggleError(err.response.data.message))
      setTimeout(() => dispatch(toggleError()),
        3000
      )
      reject('error')
    })
  })
}

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: USER_LOADING })

  return new Promise((resolve, reject) => {
    // If logged in get user info from db
    axios.get('/api/auth/user', tokenConfig(getState())).then(res => {
      dispatch({
        type: USER_LOADED,
        payload: res.data
      })
      resolve('okay')
    }).catch(err => {
      dispatch({ type: AUTH_ERROR })
      console.log('ERROR: ' + err.response.data.message)
      reject(err.response.data.message)
    })
  })
}

//If logged in, add token to config object
export const tokenConfig = state => {
  const token = state.auth.token
  const config = {
    headers: {
      "Content-type": "application/json"
    }
  }
  if (token)
    config.headers['x-auth-token'] = token
  return config
}