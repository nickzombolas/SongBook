import React, { Component } from 'react'
import {
  Button,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
} from 'reactstrap';

class AppNavBar extends Component {


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
          </Nav>
          <Button>Add New Song</Button>
        </Navbar>
      </>
    )
  }
}

export default AppNavBar