const express = require('express')
const router = express.Router()

const Song = require('../../models/Song')

// GET
// Find all Songs
router.get('/', (req, res) => {
  Song.find({status: {$exists: true}})
    .then(songs => res.json(songs))
})

// POST
// Create a new song
router.post('/', (req, res) => {
  const { title, composer, arranger } = req.body
  Song.create({
    title,
    composer,
    arranger
  }).then(song => {
    res.json(song)
  })
})

// POST
// Update one song
router.post('/:id', (req, res) => {
  const { status } = req.body
  Song.updateOne({ _id: req.params.id }, { status }).then(result => {
    Song.findById({ _id: req.params.id }).then(song => res.json(song))
  })
})

// DELETE
// Delete an Item by ID
router.delete('/:id', (req, res) => {
  Song.deleteOne({ _id: req.params.id })
    .then(res.json({ id: req.params.id }))
    .catch(err => console.log(err))
})

module.exports = router