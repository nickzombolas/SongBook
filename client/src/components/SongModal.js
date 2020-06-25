import React, { Component } from 'react'
import { Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label
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
    status: null
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    const { title, composer, arranger, status } = this.state
    const newSong = {
      title,
      composer,
      arranger,
      status
    }
    this.props.addNewSong(newSong)
    this.props.toggle()
    this.props.displayMessage(title, status)
  }

  render(){
    const { modal } = this.props
    return(
      <>
        <Modal isOpen={modal} toggle={this.toggle}>
          <ModalHeader isOpen={modal}>Add a New Song</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.handleOnSubmit}>
              <FormGroup>
                <Label for="title"><strong>Title</strong> (required)</Label>
                <Input
                  type="text"
                  name="title"
                  id="song"
                  placeholder="Add Title..."
                  onChange={this.handleChange}
                  required
                />
                <Label for="composer"><strong>Composer</strong> (required)</Label>
                <Input
                  type="text"
                  name="composer"
                  id="song"
                  placeholder="Add Composer..."
                  onChange={this.handleChange}
                  required
                />
                <Label for="arranger"><strong>Arranger</strong></Label>
                <Input
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
              <Button color="primary">Save</Button>
              <Button onClick={this.props.toggle} color="secondary">Cancel</Button>
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