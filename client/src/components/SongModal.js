import React, { Component } from 'react'
import { Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Alert
 } from 'reactstrap'
import Input from 'reactstrap/lib/Input'
import { connect } from 'react-redux'


import { WANT_TO_LEARN, LEARNING, LEARNED } from '../constants'
import { addNewSong } from '../actions/songActions'
import { displayMessage } from '../actions/uiActions'

class SongModal extends Component {

  state = {
    modal: this.props.modal,
    title: null,
    composer: null,
    arranger: null,
    status: null,
    errorMessage: null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    let { title, composer, arranger, status } = this.state
    let newSong = {}

    if((arranger === null) || arranger === '')
      newSong = {
        title,
        composer,
        status
      }
    else {
      arranger = arranger.charAt(0).toUpperCase() + arranger.slice(1)
      newSong = {
        title,
        composer,
        arranger,
        status
      }
    }
    this.props.addNewSong(newSong).then(() => {
      this.props.toggle()
      this.props.displayMessage(title, status)
    }).catch(err => {
      this.setState({
        ...this.state,
        errorMessage: err
      })
      setTimeout(() => {
        this.setState({
          ...this.state,
          errorMessage: null
        })
      }, 3000)
    })
  }

  render(){
    const { modal } = this.props
    return(
      <>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader className="justify-content-center" isOpen={modal}>Add a New Song</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleOnSubmit}>
              <FormGroup>
                <Label for="title"><strong>Title</strong> (required)</Label>
                <Input
                  className="mb-3"
                  type="text"
                  name="title"
                  id="song"
                  placeholder="Add Title..."
                  onChange={this.handleChange}
                  required
                />
                <Label for="composer"><strong>Composer</strong> (required)</Label>
                <Input
                  className="mb-3"
                  type="text"
                  name="composer"
                  id="song"
                  placeholder="Add Composer..."
                  onChange={this.handleChange}
                  required
                />
                <Label for="arranger"><strong>Arranger</strong></Label>
                <Input
                  className="mb-3"
                  type="text"
                  name="arranger"
                  id="song"
                  placeholder="Add Arranger..."
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup>
                <div>
                  <strong>Status</strong> (required)
                </div>
                <FormGroup check>
                  <Label check>
                    <Input required onClick={this.handleChange} type="radio" name="status" value={WANT_TO_LEARN} />
                    Want to Learn
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input onClick={this.handleChange} type="radio" name="status" value={LEARNING} />
                    Learning
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input onClick={this.handleChange} type="radio" name="status" value={LEARNED} />
                    Learned
                  </Label>
                </FormGroup>
              </FormGroup>
              { this.state.errorMessage !== null &&
                <Alert color="danger">{this.state.errorMessage}</Alert>
              }
              <div className="float-right">
                <Button className="mr-1" onClick={this.props.toggle} color="secondary">Cancel</Button>
                <Button color="primary">Save</Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </>
    )
  }
}

const mapStateToProps = state => ({
  song: state.song,
  ui: state.ui
})

export default connect(
  mapStateToProps,
  { addNewSong, displayMessage })
  (SongModal)