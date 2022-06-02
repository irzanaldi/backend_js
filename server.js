require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.DATABASE_URL, {useNewUrlParser: true})
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log("Database Connection"))

app.use(express.json())

//routes
const barangRoute = require('./routes/barang')
app.use('/barang', barangRoute)

app.listen(3100, () => console.log('server starting...'));