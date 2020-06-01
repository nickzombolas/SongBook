const express = require('express')
const router = express.Router()

const Song = require('../../models/Song')

router.post('/', (req, res) => {

  const newSong = new Song({
    title: req.body.title,
    composer: req.body.composer,
    arranger: req.body.arranger
  })
  newSong.save().then(song => res.json(song))
})

module.exports = router