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
import piano from '../assets/piano.webp'

class AppNavBar extends Component {

  render(){
    return(
      <>
        <div className="header">
          <img className="header" src={piano} alt="Piano" />
        </div>
        <Navbar color="primary" expand="md">
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
            (
              <NavLink>
                <Button onClick={this.props.logout}>Logout</Button>
              </NavLink>
            )
          }
          { !this.props.auth.isAuthenticated &&
            (
              <NavLink className="text-light" href="/LoginRegister">
                <Button>Login or Create Account</Button>
              </NavLink>
            )
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
