const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res) => {
  const { username, name, password } = req.body

  // catching errors
  if (!password || !username) {
    return res.status(400).json({ error: 'both password and username is required' })
  }
  if (password.length < 3 || username.length < 3){
    return res.status(400).json({ error: 'username and password must be longer than 3 characters' })
  }

  // -- unique username
  // const existing = await User.findOne({username: username})
  // if (existing) {
  //   return res.status(400).json({ error: 'expected `username` to be unique' })
  // }

  // posting new user
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash
  })

  const savedUser = await user.save()
  res.status(201).json(savedUser)
})


usersRouter.get('/', async (req, res) => {
  const users = await User.find({}).populate('blogs', { url: 1, author: 1, title: 1, id: 1 })
  res.json(users)
})

module.exports = usersRouter