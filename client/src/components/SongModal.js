import React, { Component, useState } from 'react'
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


import { WANT_TO_LEARN, LEARNING, LEARNED} from '../constants'
import { addNewSong } from '../actions/songActions'

class SongModal extends Component {

  state = {
    modal: this.props.modal,
    title: '',
    composer: '',
    arranger: '',
    status: ''
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
                <Label for="title">Title</Label>
                <Input
                  type="text"
                  name="title"
                  id="song"
                  placeholder="Add Title..."
                  onChange={this.handleChange}
                />
                <Label for="composer">Composer</Label>
                <Input
                  type="text"
                  name="composer"
                  id="song"
                  placeholder="Add Composer..."
                  onChange={this.handleChange}
                />
                <Label for="arranger">Arranger</Label>
                <Input
                  type="text"
                  name="arranger"
                  id="song"
                  placeholder="Add Arranger..."
                  onChange={this.handleChange}
                />
              </FormGroup>
              <FormGroup tag="fieldset">
                <FormGroup check>
                  <Label check>
                    <Input onClick={this.handleChange} type="radio" name="status" value={WANT_TO_LEARN} />
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
  song: state.song
})

export default connect(
  mapStateToProps,
  { addNewSong })
  (SongModal)