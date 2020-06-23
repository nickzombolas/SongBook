import React, { Component } from 'react'
import { Button, Form, Label, Input, InputGroup, ListGroup, ListGroupItem, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios'

import SongModal from './SongModal'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'
import { changeStatus } from '../actions/songActions'
import { toggleError, setMessage } from '../actions/uiActions'


class Search extends Component {

  state = {
    search: null,
    modal: false,
    results: [],
    searched: false,
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
    if((this.state.search === '' || this.state.search === null) && !this.props.ui.error)
      this.props.toggleError()
    else{
      axios.get(`/api/songs/search/${this.state.search}`).then(res => {
        const results = res.data
        this.setState({
          ...this.state,
          results,
          searched: true,
          error: false
        })
        if(this.props.ui.error)
          this.props.toggleError()
      })
    }
  }

  addToList = (id, status, title) => {
    this.props.changeStatus(id, status)
    this.props.setMessage(title, status)
  }
  
  render(){
    const { results, searched } = this.state
    return(
      <div className="text-center search">
        <h1>Search for a Song</h1>
        <Form>
          <Label for="search" />
          <InputGroup>
            <Input name="search" onChange={this.handleChange} placeholder="Please enter a song title" />
            <Button type="submit" onClick={this.handleSubmit}>Search</Button>
          </InputGroup>
          {
            this.props.ui.error &&
            <Alert className="text-left" color="danger">Please enter a song title before searching.</Alert>
          }
        </Form>
        {
          searched === true &&
          <div className="search">
            <p>If you cannot find the song you are looking for, you can add a new song here!</p>
            <Button onClick={this.toggle}>Add a New Song</Button>
            <SongModal modal={this.state.modal} toggle={this.toggle} />
          </div>
        }
        {
          this.props.ui.message !== null &&
          <Alert color="success">{this.props.ui.message}</Alert>
        }
        <ListGroup>
          {
            searched === true && results.length > 0 &&
            this.state.results.map(result => {
              return (
                <ListGroupItem key={result._id} className="container">
                  <div className="float-left mt-2">
                    {result.title}, {result.composer}
                  </div>
                  <div className="float-right">
                    <Button onClick={() => this.addToList(result._id, WANT_TO_LEARN, result.title)} className="mr-3">Want to Learn</Button>
                    <Button onClick={() => this.addToList(result._id, LEARNING, result.title)} className="mr-3">Learning</Button>
                    <Button onClick={() => this.addToList(result._id, LEARNED, result.title)}>Learned</Button>
                  </div>
                </ListGroupItem>
              )
            })
          }
          {
            searched === true && results.length === 0 &&
            <h1 className="text-center">No Results Found</h1>
          }
        </ListGroup>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  song: state.song,
  ui: state.ui
})

export default connect(
  mapStateToProps,
  { changeStatus, toggleError, setMessage })
  (Search)