const config = require('./utils/config')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const blogs = require('./controllers/blogs')
const users = require('./controllers/users')
const login = require('./controllers/login')
const mongoose = require('mongoose')
const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(blogs)
app.use(users)
app.use(login)

const mongoUrl = config.MONGODB_URI
console.log(mongoUrl)
mongoose.connect(mongoUrl, { useNewUrlParser: true })


module.exports = app