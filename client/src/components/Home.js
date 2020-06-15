import React, { Component } from 'react'

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

export default Home