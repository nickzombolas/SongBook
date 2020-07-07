import React, { Component } from 'react'
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Button
} from 'reactstrap';
import { connect } from 'react-redux';

import { logout } from '../actions/authActions'

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
            <NavItem>
              <NavLink className="text-light" href="/search">Search</NavLink>
            </NavItem>
          </Nav>
          { this.props.auth.isAuthenticated && 
            ( <Button onClick={this.props.logout}>Logout</Button> )
          }
        </Navbar>
      </>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(
  mapStateToProps,
  { logout }
)(AppNavBar)
