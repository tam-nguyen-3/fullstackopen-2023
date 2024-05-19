const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('person', (req, res) => {
  return JSON.stringify(req.body)
})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

// get all persons 
app.get('/api/persons', (req, res) => {
    res.json(persons)
})

// get info of one person
app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        return res.json(person)
    } else {
        return res.status(404).end()
    }
})

// delete info of one person
app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.find(p => p.id !== id)
  res.status(204).end()
})

// add new person to phonebook
const MAX = 1000000
const generateId = () => Math.floor(Math.random() * MAX)

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing"
    })
  }

  if (persons.map(p => p.name).includes(body.name)) {
    return res.status(400).json({
      error: "name must be unique"
    })
  }

  const newPerson = {
    id: generateId(),
    name: body.name,
    number: body.number
  }

  persons = persons.concat(newPerson)
  res.json(newPerson)
})

// display number of persons and time of request received
app.get('/info', (req, res) => {
    const timeNow = Date(Date.now())
    const info = 
    `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${timeNow}</p>
    `
    res.send(info)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})