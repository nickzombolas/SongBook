import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText, InputGroup, ListGroup, ListGroupItem } from 'reactstrap'

import SongModal from './SongModal'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'

class Search extends Component {

  sampleSongs = [
    {
      _id: 1,
      title: 'testTitle1',
      composer: 'TestComposer1',
      status: WANT_TO_LEARN,
    },
    {
      _id: 2,
      title: 'testTitle2',
      composer: 'TestComposer2',
      status: LEARNING
    },
    {
      _id: 3,
      title: 'testTitle3',
      composer: 'TestComposer3',
      status: LEARNED
    },
    {
      _id: 4,
      title: 'title',
      composer: 'composer',
      status: WANT_TO_LEARN
    },
    {
      _id: 5,
      title: 'title',
      composer: 'Composer',
      status: LEARNING
    },
    {
      _id: 6,
      title: 'Title',
      composer: 'composer',
      status: LEARNED
    },
    {
      _id: 7,
      title: 'Title',
      composer: 'Composer',
      status: WANT_TO_LEARN
    },
  ]

  state = {
    search: null,
    modal: false,
    results: []
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  handleSubmit = e => {
    e.preventDefault()
    this.setState({
      ...this.state,
      results: this.sampleSongs
    })
  }

  render(){
    return(
      <div className="text-center search">
        <h1>Search for a Song</h1>
        <Form>
          <Label for="search" />
          <InputGroup>
            <Input name="search" onChange={this.handleChange} placeholder="Please enter a song title" />
            <Button type="submit" onClick={this.handleSubmit}>Search</Button>
          </InputGroup>
        </Form>
        {
          this.state.results.length > 0 &&
          <div className="search">
            <p>If you cannot find the song you are looking for, you can add a new song here!</p>
            <Button onClick={this.toggle}>Add a New Song</Button>
            <SongModal modal={this.state.modal} toggle={this.toggle} />
          </div>
        }
        <ListGroup>
          {
            this.state.results.map(result => {
              return (
                <ListGroupItem className="container">
                  <div className="float-left mt-2">
                    {result.title}, {result.composer}
                  </div>
                  <div className="float-right">
                    <Button className="mr-3">Want to Learn</Button>
                    <Button className="mr-3">Learning</Button>
                    <Button>Learned</Button>
                  </div>
                </ListGroupItem>
              )
            })
          }
        </ListGroup>
      </div>
    )
  }
}

export default Search