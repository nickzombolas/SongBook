const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../../config/keys').jwtSecret

const User = require('../../models/User')
const auth = require('../../middleware/auth')


// GET api/auth
// Get User Information from token
// Protected
router.get('/user', auth, (req, res) => {
  User.findById(req.user.id)
    .select('-password')
    .then(user => {
      res.json(user)
    })
})


// POST api/auth
// Authenticate a user on login
// Public
router.post('/', (req, res) => {
  const { email, password } = req.body
  if(!email || !password)
    return res.status(400).json({ message: 'Enter email and password'})

  User.findOne({ email }).then(user => {
    if(!user) 
      res.status(400).json({ message: 'User does not exist' })

    //Compare entered password with user's hashed password
    bcrypt.compare(password, user.password).then(match => {
      if(!match)
        return res.status(400).json({ message: 'Incorrect Login' })
      jwt.sign(
        { id: user.id },
        jwtSecret,
        { expiresIn: 3600 },
        (err, token) => {
          if(err)
            throw err
          res.json({
            token,
            user: {
              _id: user.id,
              email: user.email,
              songs: user.songs
            }
          })
        }
      )
    })
  })
})

module.exports = router