import React, { Component } from 'react'
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';
import { connect } from 'react-redux'

import SongModal from './SongModal'
import { test } from '../actions/songActions'


class AppNavBar extends Component {

  state = {
    modal: false
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    })
  }

  render(){
    return(
      <>
        <Navbar color="dark" expand="md">
          <NavbarBrand className="text-light font-weight-bold" href="/">SongBook</NavbarBrand>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink className="text-light" href="/about">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink className="text-light" href="https://github.com/nickzombolas/SongBook">GitHub</NavLink>
            </NavItem>
            <Button onClick={this.props.test}>test</Button>
          </Nav>
          <Button onClick={this.toggle}>Add New Song</Button>
          <SongModal modal={this.state.modal} toggle={this.toggle} />
        </Navbar>
      </>
    )
  }
}

const mapStateToProps = state => ({
  song: state.song
})

export default connect(
  mapStateToProps,
  { test })
  (AppNavBar)