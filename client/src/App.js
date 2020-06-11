import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Provider } from 'react-redux'

import AppNavBar from './components/AppNavBar'
import List from './components/List'
import Footer from './components/Footer'
import store from './store'

function App() {
  return (
    <>
      <Provider store={store}>
        <AppNavBar />
          <div className="App">
            <List className="left" title="Want to Learn" />
            <List className="center" title="Learning" />
            <List className="right" title="Learned" />
          </div>
          <Footer />
      </Provider>
    </>
  );
}

export default App;
