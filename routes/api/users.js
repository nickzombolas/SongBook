const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const jwtSecret = require('../../config/keys').jwtSecret

const User = require('../../models/User')


// POST
// Register a new user
// Access: Public
router.post('/', (req, res) => {
  const { name, email, password } = req.body

  if(!name || !email || !password)
    return res.status(400).json({ message: 'Enter all fields'})

  User.findOne({ email }).then(user => {
    if(user)
      res.status(400).json({ message: 'A user already exists with this email' })

    const newUser = new User({
      name,
      email,
      password
    })

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if(err)
          throw err
        newUser.password = hash
        newUser.save().then(user => {
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
                  id: user.id,
                  email: user.email
                }
              })
            }
          )
        })
      })
    })
  })
})

module.exports = router