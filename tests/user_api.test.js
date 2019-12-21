const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const User = require('../models/user')
const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const user = {
        "username": "mluukkai",
        "name": "Matti Luukkainen",
        "password": "sekret"
      }
    
    await api.post('/api/users').send(user)
})

test('password too short', async () => {
    const user = {
        "username" : "newuser",
        "name" : "New User",
        "password" : "s"
    }

    const response = await api.post('/api/users').send(user)

    expect(response.status).toBe(400)
})

test('username not unique', async () => {
    const user = {
        
         "username": "mluukkai",
         "name": "Matti",
         "password": "sekret"
    }

    const response = await api.post('/api/users').send(user)

    expect(response.status).toBe(400)
})

afterAll(() => {
    mongoose.connection.close()
})
