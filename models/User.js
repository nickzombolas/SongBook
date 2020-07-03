const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  email: {
    required: true,
    unique: true,
    type: String
  },
  password: {
    required: true,
    type: String
  },
  songs:{
    type: [
      {
        _id: String,
        status: String,
        date: {
          type: Date,
          default: Date.now 
        }
      }
    ],
    default: []
  }

})

module.exports = User = mongoose.model('user', UserSchema)