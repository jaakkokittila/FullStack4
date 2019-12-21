const config = require('dotenv').config()

let PORT = 3003
let MONGODB_URI = 'mongodb+srv://fullstack:<password>@cluster0-miwda.mongodb.net/test?retryWrites=true&w=majority'


module.exports = {
  MONGODB_URI,
  PORT
}