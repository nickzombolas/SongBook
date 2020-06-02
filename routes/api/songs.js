const express = require('express')
const router = express.Router()

const Song = require('../../models/Song')

// Find all Songs
router.get('/', (req, res) => {
  Song.find({})
    .then(songs => res.json(songs))
})

router.post('/', (req, res) => {

  const newSong = new Song({
    title: req.body.title,
    composer: req.body.composer,
    arranger: req.body.arranger
  })
  newSong.save().then(song => res.json(song))
})

// POST
// Update one song
router.post('/:id', (req, res) => {
  Song.updateOne({ _id: req.params.id }, {
    title: req.body.title,
    composer: req.body.composer,
    arranger: req.body.arranger
  }).then(result => {
    console.log(result)
    Song.findById({ _id: req.params.id }).then(song => res.json(song))
  })
})

// Delete an Item by ID
router.delete('/:id', (req, res) => {
  Song.findById(req.params.id)
    .then(song => song.remove().then(() => {
      res.json({ success: true })
    }))
    .catch(err => {
      res.status(404).json({ success: false })
    })
})

module.exports = router