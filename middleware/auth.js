const keys = require('../config/keys')
const jwt = require('jsonwebtoken')

// Verify User Token
function auth(req, res, next) {
  const token = req.header('x-auth-token')
  if(!token) 
    return res.status(401).json({ message: 'You must create an account or log in to perform this action.' })
  try{
    const decodedToken = jwt.verify(token, keys.jwtSecret)
    req.user = decodedToken
    next()
  } catch(exception) {
    res.status(400).json({ message: 'Invalid Token' })
  }
}

module.exports = auth