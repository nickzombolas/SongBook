const express = require('express')
const mongoose = require('mongoose')

const app = express()
app.use(express.json())

const port = 5000

app.listen(port, () => console.log('Server listening on port ' + port))