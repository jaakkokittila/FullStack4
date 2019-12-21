const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  const initialBlogs = helper.initialBlogs.map(blog  => new Blog(blog))
  const saveBlogs = initialBlogs.map(blog => blog.save())
  await Promise.all(saveBlogs)

})

test('length matches', async () => {
  const response = await api.get('/api/blogs')
  const blogs = helper.initialBlogs.length
 
  expect(response.body.length).toEqual(blogs)

})

test('id instead of _id', async () => {
  const response = await api.get('/api/blogs')

  response.body.map(blog => {
    expect(blog.id).toBeDefined()
  })
})

test('adding blog', async () => {
  const newblog = {
    'title' : 'Uusi blogi',
    'author' : 'Kirjailija',
    'url' : 'uusiblogi.com',
    'likes' : 1000
  }
  
  await api.post('/api/blogs').send(newblog)
  const response = await api.get('/api/blogs')
  const length = response.body.length
  expect(length).toBe(helper.initialBlogs.length + 1)

})

test('testing bad request', async () => {
  const newBlog = {
    'author' : 'Mikko Mallikas',
    'likes' : 30
  }

  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.status).toBe(400)
})

test('undefined likes to zero', async () => {
  const newBlog = {
    'title' : 'Uus blogi',
    'author' : 'Mikko Mallikas',
    'url' : 'uusblogi.fi'
  }
  const response = await api.post('/api/blogs').send(newBlog)
  expect(response.body.likes).toBe(0)
})

test('deleting blog', async () => {
  const blogs = await api.get('/api/blogs')
  const id = blogs.body[0].id
  await api.delete(`/api/blogs/${id}`)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(helper.initialBlogs.length -1)
})

afterAll(() => {
  mongoose.connection.close()
})