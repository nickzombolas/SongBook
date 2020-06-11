import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { connect } from 'react-redux'
import { removeSong } from '../actions/songActions'

class List extends Component{

  onClick = () => {
    console.log('Item Clicked!')
    // TODO: open modal on click to display song information
  }

  onRemove = id => {
    console.log('in component')
    console.log(id)
    this.props.removeSong(id)
  }

  render(){
    const songs = this.props.song.songs.filter(song => song.status == this.props.status)
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
  { removeSong })
  (List)