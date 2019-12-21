const User = require('../models/user')
const express = require('express')
const app = express()
const bcrypt = require('bcrypt')

app.post('/api/users', async (request, response) => {
    try {
    
      const body = request.body
      if(body.password.length < 3){
          response.status(400).send("Password too short")
      }else{
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)
  
        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
        })
  
        const savedUser = await user.save()
  
        response.json(savedUser)
        }
      }catch(exception){
          response.status(400).send(exception)
      }
  
      
  })

  app.get('/api/users', async (request, response) => {
      const users = await User.find({})
      response.json(users.map(user => user.toJSON()))
  })
  
  module.exports = app
  