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


class SongModal extends Component {

  state = {
    modal: this.props.modal,
    title: '',
    composer: '',
    arranger: '',
  }

  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleOnSubmit = (e) => {
    e.preventDefault()
    console.log(this.state)
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
                    <Input type="radio" name="status" />{' '}
                    Want to Learn
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="status" />{' '}
                    Learning
                  </Label>
                </FormGroup>
                <FormGroup check>
                  <Label check>
                    <Input type="radio" name="status" />{' '}
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

export default SongModal