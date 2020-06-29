import React from 'react';
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

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
          <AppNavBar />
            <Route exact path='/about' component={About} />
            <Route exact path='/' component={Home} />
            <Route exact path='/search' component={Search} />
            <Footer />
          </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
