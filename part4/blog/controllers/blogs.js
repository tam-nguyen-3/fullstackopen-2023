const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware');



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {username: 1, name: 1, id: 1})
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
  if (!req.body.title || !req.body.url){
    return res.status(400).json({error: "blog must have a title and/or an url"}).end() 
  }

  // const user = await User.findById(decodedToken.id)
  const user = req.user
  const blog = new Blog({ ...req.body, user: user.id })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
  const blogId = req.params.id
  const user = req.user
  const blog = await Blog.findById(req.params.id)

  if (blog.user.toString() !== user.id.toString()) {
    return res.status(401).json({ error: "user unauthorized to delete blog" })
  }

  await Blog.findByIdAndDelete(blogId)
  user.blogs = user.blogs.filter(blog => blog.id.toString() !== blogId)
  await user.save()

  res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
  const blog = req.body
  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true, runValidators: true })
  if (!updatedBlog) {
    return res.status(404).send({ error: "Blog not found" })
  }
  res.status(201).json(updatedBlog)
})



module.exports = blogsRouter