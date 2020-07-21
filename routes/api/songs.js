const express = require('express')
const router = express.Router()


const auth = require('../../middleware/auth')
const Song = require('../../models/Song')
const User = require('../../models/User') 

// GET
// Find all Songs associated with a user
router.get('/', (req, res) => {
  const { songs } = req.query
  Song.find({ _id : { $in : songs }}).sort({ date: -1 }).then(result => {
    res.json(result)
  }).catch(err=> {
    console.log(err)
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

router.get('/livelearn', (req, res) => {
  let userSongIDS = []
  let songsToSend = []
  User.findOne({ email: 'nickzombolas@gmail.com' }).then(user => {
    user.songs.forEach(song => {
      userSongIDS = [...userSongIDS, song.id]
    })
    Song.find({ _id : { $in : userSongIDS }}).then(songInfo => {
      user.songs.forEach(userSong => {
        songInfo.forEach(song => {
          if(userSong._id.toString() === song._id.toString()) {
            const newSong = {
              _id: userSong._id,
              title: song.title,
              composer: song.composer,
              status: userSong.status
            }
            songsToSend.push(newSong)
          }
        })
      })
      res.send(songsToSend)
    }).catch(err=> {
      console.log(err)
    })
  }).catch(err => {
    console.log(err)
  })
})

// POST
// Create a new song
router.post('/', (req, res) => {
  const { song, userID } = req.body
  Song.create(song).then((song, err) => {
    User.findById({ _id: userID }).then(user => {
      const newSong = {
        _id: song._id,
        status: song.status
      }
      const newSongs = [newSong, ...user.songs]
      User.updateOne({ _id: userID }, { songs: newSongs }).then(user => {
        res.json(user)
      }).catch(err => {
        res.json({ message: 'Error updating user songs' })
      })
    })
    res.json(song)
  }).catch(err => {
    console.log(err)
  })
})

// POST
// Update one song
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