import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavBar from './components/AppNavBar'
import List from './components/List'

function App() {
  return (
    <>
      <AppNavBar />
        <div className="App">
          <List className="left" />
          <List className="center" />
          <List className="right" />
        </div>
    </>
  );
}

export default App;
