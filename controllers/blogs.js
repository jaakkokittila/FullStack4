const Blog = require('../models/blog')

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
    }
    return null
  }


app.get('/api/blogs', async (request, response) => {
    
    const blogs = await Blog.find({}).populate('user', {username : 1, name : 1})
    response.json(blogs.map(blog => blog.toJSON()))
  })
  
  app.get('/api/blogs/:id', async(request, response) =>{
      try{
         
          const blog = await Blog.findById(request.params.id)
          response.json(blog.toJSON())
      }catch{
          response.status(404).end()
      }
  }) 
  app.post('/api/blogs', async (request, response) => {

    const token = getTokenFrom(request)
  
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }


    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
        user: user._id
    })
    if(blog.title === undefined || blog.url === undefined){
        response.status(400).send("Bad request")
    }else{
        if(blog.likes === undefined){
            blog.likes = 0
        }
    

        try{
            const savedBlog = await blog.save()
            user.blogs = user.blogs.concat(savedBlog._id)
            await user.save()
            response.json(savedBlog.toJSON())
        }catch (error){
            console.log(error)
        }
    }
  
    
  }catch(error){
      console.log(error)
  }})

  app.put('/api/blogs/:id', async (request, response) =>{
      const blog = new Blog(request.body)

      const newBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new : true})
      return response.status(204).json(newBlog.toJSON())
  })

  app.delete('/api/blogs/:id', async (request, response) => {
      
      try{
        await Blog.findByIdAndRemove(request.params.id)
        response.status(204).end()

      }catch(error){
          console.log(error)
      }
      
  })

  module.exports = app