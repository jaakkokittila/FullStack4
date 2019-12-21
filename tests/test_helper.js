const Blog = require('../models/blog')

const blogsInDb = async () =>{
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const initialBlogs = [{
    title: 'React patterns',
    author: 'Michael Chan',
    likes: 7,
    url: 'www'
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    likes: 5,
    url: 'www'
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    likes: 12,
    url: 'www'
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    likes: 10,
    url: 'www'
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    likes: 0,
    url: 'www'
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    likes: 2,
    url: 'www'
  }
]

module.exports = {
    blogsInDb,
    initialBlogs
}