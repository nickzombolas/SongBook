const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    required,
    unique,
    type: String
  },
  password: {
    required,
    type: String
  },
  songs:{
    type: [
      {
      _id: String,
      status: String
      }
    ],
    default: []
  }

})

module.exports = Song = mongoose.model('user', UserSchema)