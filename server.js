const express = require('express')
const mongoose = require('mongoose')
const songs = require('./routes/api/songs')
const users = require('./routes/api/users')
const auth = require('./routes/api/auth')

const app = express()
app.use(express.json())

const db = require('./config/keys').mongoURL

mongoose
	.connect(db, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log("MongoDB Successfully Connected!"))
	.catch(err => console.log(err))

app.use('/api/songs', songs)
app.use('/api/users', users)
app.use('/api/auth', auth)
const port = 5000

app.listen(port, () => console.log('Server listening on port ' + port))