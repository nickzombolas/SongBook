import React, { Component } from 'react'
import { Button, Form, Label, Input, InputGroup, ListGroup, ListGroupItem, Alert } from 'reactstrap'
import { connect } from 'react-redux'
import axios from 'axios'

import SongModal from './SongModal'
import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'
import { changeStatus } from '../actions/songActions'
import { toggleError, displayMessage } from '../actions/uiActions'
import { tokenConfig } from '../actions/authActions'


class Search extends Component {

  state = {
    search: null,
    modal: false,
    results: [],
    searched: false
  }

  componentDidMount() {
    while(this.props.auth.isLoading){}
      axios.get('/api/songs/popular', tokenConfig(this.props)).then(res => {
        this.setState({
          ...this.state,
          results: res.data
        })
      })
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
    if((this.state.search === '' || this.state.search === null) && !this.props.ui.error){
      this.props.toggleError('Please enter a song title before searching.')
      setTimeout(() => this.props.toggleError(),
        3000
      )
    }
    else{
      axios.get(`/api/songs/search/${this.state.search}`, tokenConfig(this.props)).then(res => {
        const results = res.data
        this.setState({
          ...this.state,
          results,
          searched: true,
          error: false
        })
      }).catch(err => {
        this.props.toggleError(err.response.data.message)
      })
    }
  }

  addToList = (id, status, title) => {
    this.props.changeStatus(id, this.props.auth.user._id, status)
    this.props.displayMessage(title, status)
  }
  
  disabled = (_id, status) => {
    if (this.props.auth.user.songs.filter(song => (song._id === _id) && song.status === status).length === 0)
      return false
    return true
  }

  render(){
    const { results, searched } = this.state
    return(
      <div className="text-center search">
        <h1>Search for a Song Title</h1>
        <Form>
          <Label for="search" />
          <InputGroup className="search-width">
            <Input name="search" onChange={this.handleChange} placeholder="Please enter a song title (Fur Elise, Clair de Lune, etc.)" />
            <Button type="submit" onClick={this.handleSubmit}>Search</Button>
          </InputGroup>
          <Alert isOpen={this.props.ui.error} className="text-left search-width" color="danger">{this.props.ui.errorMessage}</Alert>
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
          searched === false && this.props.auth.isAuthenticated &&
          <>
            <h2 className="mt-5 mb-3">Popular Songs</h2>
            <p>You can search the database for a song title you're looking for, or browse popular songs below.</p>
          </>
        }
        <div className="alert">
          <Alert isOpen={this.props.ui.message !== null} className="search-width" color="success">{this.props.ui.message}</Alert>
        </div>
        <ListGroup className="mt-4 mb-5">
          {
            results.length > 0 && this.props.auth.isAuthenticated &&
            this.state.results.map(result => {
              return (
                <ListGroupItem key={result._id} className="container">
                  <div className="float-left mt-2">
                    {result.title}, {result.composer}
                  </div>
                  <div className="float-right ml-auto">
                    <Button
                      disabled={this.disabled(result._id, WANT_TO_LEARN)}
                      onClick={() => this.addToList(result._id, WANT_TO_LEARN, result.title)}
                      className="mr-3"
                    >
                      Want to Learn
                    </Button>
                    <Button
                      disabled={this.disabled(result._id, LEARNING)}
                      onClick={() => this.addToList(result._id, LEARNING, result.title)}
                      className="mr-3"
                    >
                      Learning
                    </Button>
                    <Button
                      disabled={this.disabled(result._id, LEARNED)}
                      onClick={() => this.addToList(result._id, LEARNED, result.title)}
                    >
                      Learned
                    </Button>
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
  ui: state.ui,
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { changeStatus, toggleError, displayMessage })
  (Search)