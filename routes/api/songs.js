const express = require('express')
const router = express.Router()


const auth = require('../../middleware/auth')
const Song = require('../../models/Song')
const User = require('../../models/User') 

// GET
// Find all Songs associated with a user
router.get('/', (req, res) => {
  const { songs } = req.query
  Song.find({ _id : { $in : songs }}).then(result => {
    res.json(result)
  })
})

// GET
// query for a song title
router.get('/search/:title', auth, (req, res) => {
  const splitTitle = req.params.title.split(' ')
  let title = []
  splitTitle.forEach(word => {
    word = word.charAt(0).toUpperCase() + word.slice(1);
    title.push(new RegExp(word))
  })
  Song.find({ title: {$in: title} }).then(songs => {
    res.json(songs)
  })
})

// POST
// Create a new song
// Access: Protected
router.post('/', auth, (req, res) => {
  Song.create(req.body.song).then((song, err) => {
    console.log(song)
    res.json(song)
  }).catch(err => {
    console.log(err)
  })
})

// POST
// Update one song

//this is stupid, break into 3 routes
router.post('/:id', (req, res) => {
  const { status, userID } = req.body
  if(status === undefined) { 
    // Remove song from users list
    User.findById({ _id: userID }).then(user => {
      const newSongs = user.songs.filter(song => song._id !== req.params.id)
      User.updateOne({ _id: userID }, { songs: newSongs }).then(result => {
        res.json(result)
      }).catch(err => {
        console.log(err)
      })
    }).catch(err => {
      console.log(err)
    })
  }
  else{
    // Song.updateOne({ _id: req.params.id }, { status }).then(result => {
    //   Song.findById({ _id: req.params.id }).then(song => res.json(song))
    // })
    User.findById({ _id: userID }).then(user => {
      if(user.songs.filter(song => song._id === req.params.id).length === 0) {
        // Add new song to user's list
        const newSong = {
          _id: req.params.id,
          status
        }
        const updatedSongs = [...user.songs, newSong]
        User.updateOne({ _id: userID }, { songs: updatedSongs }).then(result => {
          res.json(result)
        })
      }
      else {
        // Change status of song in user's list
        const newSong = {
          _id: req.params.id,
          status
        }
        let updatedSongs = user.songs.filter(song => song._id !== req.params.id)
        updatedSongs = [...updatedSongs, newSong]
        User.updateOne({ _id: userID }, { songs: updatedSongs }).then(result => {
          res.json(status)
        }).catch(err => {
          console.log(err)
        })
      }
    }).catch(err => {
      console.log(err)
    })
  }
})

// DELETE
// Delete an Item by ID
// not used right now
router.delete('/:id', (req, res) => {
  Song.deleteOne({ _id: req.params.id })
    .then(res.json({ id: req.params.id }))
    .catch(err => console.log(err))
})

module.exports = router