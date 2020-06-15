import React, { Component } from 'react'
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

import SongModal from './SongModal'

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
            <NavItem>
              <NavLink className="text-light" href="/search">Search</NavLink>
            </NavItem>
          </Nav>
          <Button href='/search' onClick={this.toggle}>Search for a New Song</Button>
          <SongModal modal={this.state.modal} toggle={this.toggle} />
        </Navbar>
      </>
    )
  }
}

export default AppNavBar