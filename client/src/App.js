import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'

import AppNavBar from './components/AppNavBar'
import List from './components/List'
import Footer from './components/Footer'
import store from './store'
import { WANT_TO_LEARN, LEARNING, LEARNED } from './constants'


function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavBar />
          <div className="App">
            <List className="left" status={WANT_TO_LEARN} />
            <List className="center" status={LEARNING} />
            <List className="right" status={LEARNED} />
          </div>
          <Footer />
      </Provider>
    </>
  );
}

export default App;
