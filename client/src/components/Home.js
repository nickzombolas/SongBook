import React, { Component } from 'react'
import { connect } from 'react-redux'

import { getSongs } from '../actions/songActions'
import List from './List'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'

class Home extends Component {

  render(){
    return (
      <div className="App">
        <List className="left" status={WANT_TO_LEARN} />
        <List className="center" status={LEARNING} />
        <List className="right" status={LEARNED} />
    </div>
    )
  }
}

const mapStateToProps = state => ({
  song: state.song,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { getSongs })
  (Home)