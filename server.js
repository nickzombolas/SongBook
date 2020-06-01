const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const db = require('./config/keys').mongoURL

mongoose
	.connect(db, { useNewUrlParser: true })
	.then(() => console.log("MongoDB Successfully Connected!"))
	.catch(err => console.log(err))

const port = 5000

app.listen(port, () => console.log('Server listening on port ' + port))