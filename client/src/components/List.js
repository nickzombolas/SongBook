import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'


class List extends Component{

  state = {
    songs: ['Testing Song 1', 'Testing Song 2', 'Testing Song 3']
  }

  onClick = () => {
    console.log('Item Clicked!')
    // TODO: open modal on click to display song information
  }

  render(){
    return(
      <div className="list">
        <ListGroup>
        <h1 className="text-center">List Title</h1>
          {this.state.songs.map(song => {
            return(
              <ListGroupItem tag="button" onClick={this.onClick}>{song}</ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

export default List