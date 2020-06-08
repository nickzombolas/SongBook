import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavBar from './components/AppNavBar'
import List from './components/List'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <AppNavBar />
        <div className="App">
          <List className="left" title="Want to Learn" />
          <List className="center" title="Learning" />
          <List className="right" title="Learned" />
        </div>
        <Footer />
    </>
  );
}

export default App;
