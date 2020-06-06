import React, { Component } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'

const WANT_TO_LEARN = 'WANT_TO_LEARN'
const LEARNING = 'LEARNING'
const LEARNED = 'LEARNED'

class List extends Component{

  state = {
    songs: [
      {
        title: 'testTitle1',
        composer: 'TestComposer1',
        status: WANT_TO_LEARN,
      },
      {
        title: 'testTitle2',
        composer: 'TestComposer2',
        status: LEARNING
      },
      {
        title: 'testTitle3',
        composer: 'TestComposer3',
        status: LEARNED
      },
    ]
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
              <ListGroupItem tag="button" onClick={this.onClick}>{song.title}</ListGroupItem>
            )
          })}
        </ListGroup>
      </div>
    )
  }
}

export default List