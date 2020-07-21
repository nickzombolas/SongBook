import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import axios from 'axios'

import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'

class LiveLearn extends Component {

  state = {
    songs: []
  }

  componentDidMount() {
    axios.get('/api/songs/livelearn').then(res => {
      this.setState({
        songs: res.data
      })
    })
  }

  render(){
    return (
      <div className="App">
        <div className="left list">
          <h2 className="text-center">Want to Learn</h2>
          <ListGroup>
            {
              this.state.songs.filter(song => song.status === WANT_TO_LEARN).map(song => {
                return (
                  <ListGroupItem key={song._id}>
                    <div className="text-center">
                      {song.title}, {song.composer}
                    </div>
                  </ListGroupItem>
                )
              })
            }
          </ListGroup>
        </div>
        <div className="center list">
          <h2 className="text-center">Learning</h2>
          <ListGroup>
          {
              this.state.songs.filter(song => song.status === LEARNING).map(song => {
                return (
                  <ListGroupItem key={song._id}>
                    <div className="text-center">
                      {song.title}, {song.composer}
                    </div>
                  </ListGroupItem>
                )
              })
            }
          </ListGroup>
        </div>
        <div className="right list">
          <h2 className="text-center">Learned</h2>
          <ListGroup>
          {
              this.state.songs.filter(song => song.status === LEARNED).map(song => {
                return (
                  <ListGroupItem key={song._id}>
                    <div className="text-center">
                      {song.title}, {song.composer}
                    </div>
                  </ListGroupItem>
                )
              })
            }
          </ListGroup>
        </div>
    </div>
    )
  }
}

export default LiveLearn