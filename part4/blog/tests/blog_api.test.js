const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')

describe('GET operations with initially saved blogs', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
  })

  test('Blogs are returned as JSON and have the correct amount', async () => {
    const res = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    assert.strictEqual(res.body.length, helper.initialBlogs.length)
  })
})

describe("Getting an individual blog", () => {
  test("success with a valid blog", async () => {
    const blogs = await helper.blogsInDb()
    const result = await api
      .get(`/api/blogs/${blogs[0].id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    assert.deepStrictEqual(blogs[0], result.body)
  })

  // test("with nonexistentid", async () => {
  //   const nonexistentId = await helper.nonexistentId()
  //   await api
  //     .get(`/api/blogs/${blogs[0].id}`)
  // })
})


test('unique identifier is named id, not _id', async () => {
  const blogs = await helper.blogsInDb()
  assert((blogs[0].hasOwnProperty('id') & !blogs[0].hasOwnProperty('_id')))
})

describe('Adding a new blog', () => {
  let header 

  beforeEach(async () => {
    await User.deleteMany({})
    const newUser = {
      username: "root",
      password: "salainen"
    }

    await api
      .post('/api/users')
      .send(newUser)

    const loginRes = await api
      .post('/api/login')
      .send(newUser)
    
    const token = loginRes.body.token
    header = { 'Authorization': `Bearer ${token}` }
  })

  test('POST api: logged in, correct length and content', async () => {
    const newBlog = {
      title: "New Added Blog",
      author: "Nhat Phong",
      url: "google.com",
      likes: 1
    }
  
    await api
      .post('/api/blogs')
      .set(header)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const res = await api.get('/api/blogs')
    const contents = res.body
    const { id, user, ...newBlogWithoutId } = contents.find(blog => blog.title === "New Added Blog")
    assert.strictEqual(contents.length, helper.initialBlogs.length + 1)
    assert.deepStrictEqual(newBlogWithoutId, newBlog)
  })
  
  test('raise 401 Unauthorized if no token is provided', async () => {
    const newBlog = {
      title: "No token accompanied",
      author: "Amy",
      url: "x.com",
      likes: 4
    }
  
    await api
      .post('/api/blogs')
      .set({'Authorization': 'Bearer '})
      .send(newBlog)
      .expect(401)
  })

  test('if the request misses the likes property, the default is 0', async () => {
    const newBlog = {
      title: "This doesn't have a like count",
      author: "Chief Keith",
      url: "x.com"
    }
  
    await api
      .post('/api/blogs')
      .set(header)
      .send(newBlog)
    
    const res = await api.get('/api/blogs')
    const contents = res.body
    const blog = contents.find(blog => blog.title === "This doesn't have a like count")
    assert.strictEqual(blog.likes, 0)
  })
  
  test('missing title property', async () => {
    const newBlog = {
      author: "Anon",
      url: "x.com"
    }

    await api
      .post('/api/blogs')
      .set(header)
      .send(newBlog)
      .expect(400)
  })

  test('missing url property', async () => {
    const newBlog = {
      title: "No title",
      author: "Anon",
    }

    await api
      .post('/api/blogs')
      .set(header)
      .send(newBlog)
      .expect(400)
  })
})

describe("Deleting a blog", () => {
  let header 

  beforeEach(async () => {
    await User.deleteMany({})
    const newUser = {
      username: "root",
      password: "salainen"
    }

    await api
      .post('/api/users')
      .send(newUser)

    const loginRes = await api
      .post('/api/login')
      .send(newUser)
    
    const token = loginRes.body.token
    header = { 'Authorization': `Bearer ${token}` }
  })
  
  test("successfully remove a blog given the valid id", async () => {
    const blogs = await helper.blogsInDb()
    const blogToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)
    
    const blogsAfterDelete = await helper.blogsInDb()
    assert(blogs.length - 1, blogsAfterDelete.length)
    assert(!blogsAfterDelete.find(blog => blog.id === blogToDelete.id))
  })

  test("nonexistent id does not change db", async () => {
    const blogs = await helper.blogsInDb()
    const nonexistentId = await helper.nonexistentId()

    await api
      .delete(`/api/blogs/${nonexistentId}`)
      .expect(204)

    const blogsAfterDelete = await helper.blogsInDb()
    assert(blogs.length, blogsAfterDelete.length)
    assert(!blogsAfterDelete.find(blog => blog.id === nonexistentId))
  })
})

describe.only("PUT: fixing the likes", () => {
  test("successfully fixing the like", async () => {
    const blogs = await helper.blogsInDb()
    const updatedBlog = {...blogs[0], likes: 100}

    await api.put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(201)

    const blogsAfter = await helper.blogsInDb()
    assert.strictEqual(blogs.length, blogsAfter.length)
    assert(blogsAfter.find(blog => (blog.id === updatedBlog.id && blog.likes === 100)))
  })
})


after(async () => {
  await mongoose.connection.close()
})
