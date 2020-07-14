import React, { Component } from 'react'
import { Button } from 'reactstrap'
import { connect } from 'react-redux'

import { getSongs } from '../actions/songActions'
import List from './List'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'

class Home extends Component {

  render(){
    return (
      <>
        { this.props.auth.isAuthenticated &&
          (
            <>
              <div className="App">
                <List className="left" status={WANT_TO_LEARN} />
                <List className="center" status={LEARNING} />
                <List className="right" status={LEARNED} />
              </div>
              { this.props.song.songs.length === 0 &&
                <div className="text-center">
                  <h4>
                    There are no songs here! Click here to search for songs to add.
                  </h4>
                  <Button onClick={() => this.props.history.push('/Search')}>
                    Search
                  </Button>
                </div>
              }
            </>
          )
        }
        
        { !this.props.auth.isAuthenticated &&
          (
            <div className="mt-5 text-center">
              <h2 className="mb-4">To create a SongBook, log in or create an account.</h2>
              <Button onClick={() => this.props.history.push('/LoginRegister')}>
                Login or Create Account
              </Button>
            </div>
          )
        }
      </>
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