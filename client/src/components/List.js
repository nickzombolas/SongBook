import React, { Component } from 'react'
import { ListGroup, ListGroupItem, Button } from 'reactstrap'
import { connect } from 'react-redux'

class List extends Component{

  onClick = () => {
    console.log('Item Clicked!')
    // TODO: open modal on click to display song information
  }

  onDelete = () => {
    console.log('delete clicked')
  }

  render(){
    const songs = this.props.song.songs.filter(song => song.status == this.props.status)
    return(
      <div className="list">
        <ListGroup>
          <h1 className="text-center">{this.props.status}</h1>
          {songs.map(song => {
            return(
              <div className="container">
                <Button
                  className="remove-btn left"
                  color="danger"
                  size="sm"
                  onClick={this.onDelete}
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
)
(List)