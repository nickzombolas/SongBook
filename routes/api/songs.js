const express = require('express')
const router = express.Router()

const Song = require('../../models/Song')

// GET
// Find all Songs
router.get('/', (req, res) => {
  Song.find({status: {$exists: true}})
    .then(songs => res.json(songs))
})

// GET
// query for a song title
router.get('/search/:title', (req, res) => {
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
router.post('/', (req, res) => {
  Song.create(req.body.song).then((song, err) => {
    console.log(song)
    res.json(song)
  })
})

// POST
// Update one song
// edit: phase 1 uses this to add/remove status as well.
// this will be updated in phase 2
router.post('/:id', (req, res) => {
  const { status } = req.body
  if(status === undefined) {
    Song.updateOne({ _id: req.params.id }, {$unset: {status: ''}}).then(result => {
      Song.findById({ _id: req.params.id }).then(song =>  res.json(song))
    })
  }
  else{
    Song.updateOne({ _id: req.params.id }, { status }).then(result => {
      Song.findById({ _id: req.params.id }).then(song => res.json(song))
    })
  }
})

// DELETE
// Delete an Item by ID
router.delete('/:id', (req, res) => {
  Song.deleteOne({ _id: req.params.id })
    .then(res.json({ id: req.params.id }))
    .catch(err => console.log(err))
})

module.exports = router