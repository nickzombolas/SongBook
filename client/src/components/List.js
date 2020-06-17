import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { removeSong, changeStatus, getSongs } from '../actions/songActions'
import arrow from '../assets/arrow-right-solid.svg'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'

class List extends Component{

  componentDidMount(){
    this.props.getSongs()
  }

  onClick = () => {
    console.log('Item Clicked!')
    // TODO: open modal on click to display song information
  }

  onRemove = id => {
    console.log('in component')
    console.log(id)
    this.props.removeSong(id)
  }

  onChangeStatus = (id, status) => {
    let newStatus = ''
    if (status === WANT_TO_LEARN)
      newStatus = LEARNING
    else if (status === LEARNING)
      newStatus = LEARNED
    this.props.changeStatus(id, newStatus)
  }

  render(){
    const songs = this.props.song.songs.filter(song => song.status === this.props.status)
    return(
      <div className="list">
        <ListGroup>
          <h1 className="text-center">{this.props.status}</h1>
          {songs.map(song => {
            return(
              <div key={song._id} className="container">
                <Button
                  className="remove-btn left"
                  color="danger"
                  size="sm"
                  onClick={() => this.onRemove(song._id)}
                >
                &times;</Button>
                <ListGroupItem className="right" tag="button" onClick={this.onClick}>
                  {song.title}, {song.composer}
                  {
                    (song.status === WANT_TO_LEARN || song.status === LEARNING) &&
                    <Button onClick={() => this.onChangeStatus(song._id, song.status)} className="float-right" color="light">
                      <img className="arrow" src={arrow}></img>
                    </Button>
                  }
                </ListGroupItem>
              </div>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  song: state.song
})

export default connect(
  mapStateToProps,
  { removeSong, changeStatus, getSongs })
  (List)