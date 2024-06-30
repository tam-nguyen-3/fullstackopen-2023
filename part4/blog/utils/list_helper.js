var _ = require('lodash')

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((total, blog) => total + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null

  const mostBlogAuthor = _(blogs).groupBy('author').map((blogs, author) => ({
    author: author,
    blogs: blogs.length
  })).maxBy('blogs')
  return mostBlogAuthor
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  
  const mostLikesAuthor = _(blogs).groupBy('author').map((blogs, author) => ({
    author: author,
    likes: blogs.reduce((total, blog) => total + blog.likes, 0)
  })).maxBy('likes')
  return mostLikesAuthor
}

module.exports = {
  dummy, 
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}