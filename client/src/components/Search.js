import React, { Component } from 'react'
import { Button, Form, Label, Input, InputGroup, ListGroup, ListGroupItem } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios'

import SongModal from './SongModal'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'
import { changeStatus } from '../actions/songActions'


class Search extends Component {

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
    axios.get(`/api/songs/search/${this.state.search}`).then(res => {
      const results = res.data
      this.setState({
        ...this.state,
        results
      })
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
                    <Button onClick={() => this.props.changeStatus(result._id, WANT_TO_LEARN)} className="mr-3">Want to Learn</Button>
                    <Button onClick={() => this.props.changeStatus(result._id, LEARNING)} className="mr-3">Learning</Button>
                    <Button onClick={() => this.props.changeStatus(result._id, LEARNED)}>Learned</Button>
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

const mapStateToProps = state => ({
  song: state.song
})

export default connect(
  mapStateToProps,
  { changeStatus })
  (Search)