const mongoose = require('mongoose')
const Schema = mongoose.Schema

const SongSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  composer: {
    type: String,
    required: true
  },
  arranger: {
    type: String,
  }
})

module.exports = Song = mongoose.model('song', SongSchema)