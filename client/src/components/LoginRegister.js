import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, Alert } from 'reactstrap'
import { connect } from 'react-redux'

import { createAccount, login } from '../actions/authActions'
import { getSongs } from '../actions/songActions'

class LoginRegister extends Component {

  state = {
    loginEmail: null,
    loginPassword: null,
    name: null,
    createEmail: null,
    createPassword: null,
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  createAccount = e => {
    e.preventDefault()
    const { name, createEmail, createPassword } = this.state
    const newUser = {
      name,
      email: createEmail,
      password: createPassword
    }
    this.props.createAccount(newUser).then(() => {
      this.props.history.push('/')
    })
  }

  login = e => {
    e.preventDefault()
    const email = this.state.loginEmail
    const password = this.state.loginPassword
    this.props.login(email, password).then(() => {
      this.props.getSongs(this.props.auth.user.songs)
      this.props.history.push('/')
    })
  }

  render() {
    return (
      <>
        <div className="container mt-5">
          <div className="left mb-4 pr-5">
            <h1 className="text-center mb-4">Login</h1>
            <Form>
              <FormGroup>
                <Label for="loginEmail">Email</Label>
                <Input type="email" name="loginEmail" onChange={this.onChange} placeholder="example@example.com" />
              </FormGroup>
              <FormGroup>
                <Label for="password" type="password">Password</Label>
                <Input type="password" name="loginPassword" onChange={this.onChange} placeholder="Password" />
              </FormGroup>
              <Button onClick={this.login}>Login</Button>
            </Form>
          </div>
          <div className="right">
            <h1 className="text-center mb-4">Create Account</h1>
            <Form className="mb-5">
              <FormGroup>
                <Label for="name">Name</Label>
                <Input name="name" onChange={this.onChange} />
              </FormGroup>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="createEmail" onChange={this.onChange} placeholder="example@example.com" />
              </FormGroup>
              <FormGroup>
                <Label for="password" type="password">Password</Label>
                <Input type="password" name="createPassword" onChange={this.onChange} placeholder="Password" />
              </FormGroup>
              <Button className="mb-3" onClick={this.createAccount}>Create Account</Button>
            </Form>
          </div>
        </div>
        {this.props.ui.error &&
          (
            <Alert className="mx-5" color="danger">{this.props.ui.errorMessage}</Alert>
          )
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  ui: state.ui
})

export default connect(
  mapStateToProps,
  { createAccount, login, getSongs })
  (LoginRegister)