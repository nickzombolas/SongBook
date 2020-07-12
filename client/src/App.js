import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'

import AppNavBar from './components/AppNavBar'
import Home from './components/Home'
import Footer from './components/Footer'
import About from './components/About'
import Search from './components/Search'
import store from './store'
import { loadUser } from './actions/authActions'
import { getSongs } from './actions/songActions'
import LoginRegister from './components/LoginRegister';

class App extends Component {
  
  componentDidMount(){
    store.dispatch(loadUser()).then(() => {
      if(store.getState().auth.isAuthenticated){
        console.log(store.getState().auth.user.songs)
        store.dispatch(getSongs(store.getState().auth.user.songs))
      }
    })
  }

  render(){
    return (
      <>
        <Provider store={store}>
          <BrowserRouter>
            <AppNavBar />
              <Route exact path='/about' component={About} />
              <Route exact path='/' component={Home} />
              <Route exact path='/search' component={Search} />
              <Route exact path='/LoginRegister' component={LoginRegister} />
              <Footer />
            </BrowserRouter>
        </Provider>
      </>
    )
  }
}

export default App;
