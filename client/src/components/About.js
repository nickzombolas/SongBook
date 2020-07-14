import React, { Component } from 'react'

class About extends Component {
  render(){
    return(
      <div className="m-3 p-3">
        <h1 className="m-3 text-center">About</h1>
        <div className="indent container">
          <p>
            SongBook is an app designed to help musicians track the songs they are learning.
            Search through the database of over 5000 songs, and categorized them based on which songs you want to learn, 
            are currently learning, or have already learned. If you don't see a song you're learning in the database, you can add it! 
            As you learn to play more songs, you will quickly develop a SongBook to share with anybody interested in hearing you 
            play. The app currently focuses on classical piano music, as I am learning to play piano. The database will continue 
            to develop as more music will be added for other genres as well as music for many instruments besides piano. For 
            more information, view my live SongBook below, and refer to my <a href="https://github.com/nickzombolas/SongBook">GitHub </a>
            to see the source code.
          </p>
        </div>
      </div>
    )
  }
}

export default About