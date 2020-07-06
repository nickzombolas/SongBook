import React, { Component } from 'react'
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap'
import { connect } from 'react-redux'

import { createAccount } from '../actions/authActions'

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
    console.log(this.state)
  }

  login = () => {
    //login button
  }

  createAccount = e => {
    e.preventDefault()
    const { name, createEmail, createPassword } = this.state
    const newUser = {
      name,
      email: createEmail,
      password: createPassword
    }
    console.log('new user')
    console.log(newUser)
    this.props.createAccount(newUser)
  }

  render() {
    return (
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
          <Form>
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
            <Button onClick={this.createAccount}>Create Account</Button>
          </Form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { createAccount })
  (LoginRegister)