import { useState } from 'react'

const Input = ({text, value, handleChange}) => {
  return (
    <div>{text} <input value={value} onChange={handleChange}/></div>
  )
}
const Filter = ({filter, handleChange}) => {
  return (
    <Input text='filter shown with' value={filter} handleChange={handleChange}></Input>
  )
}

const PersonForm = ({formHandler, name, handleName, number, handleNumber}) => {
  return (
    <form onSubmit={formHandler}>
      <div>
        <Input text='name:' value={name} handleChange={handleName}></Input>
        <Input text='number:' value={number} handleChange={handleNumber}></Input>      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Detail = ({name, number}) => <p key={name}>{name} {number}</p>

const Persons = ({persons}) => {
  return (
    persons.map((person) => <Detail name={person.name} number={person.number}></Detail>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  const personsToShow = (newFilter.length === 0) 
    ? persons
    : persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
    /* more understandable code:
    : persons.filter((person) => {
      const name = person.name.toLowerCase()
      const filter = newFilter.toLowerCase()
      return (name.includes(filter))
    })
    */

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  const addName = (event) => {
    event.preventDefault()

    if (persons.findIndex((person) => person.name === newName) != -1) {
      return (alert(`${newName} is already added to phonebook`))
    }

    setPersons(persons.concat({
      id: persons.length + 1,
      name: newName,
      number: newNumber
    }))
    setNewName('')
    setNewNumber('')
  }

  console.log(persons)

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleChange={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm formHandler={addName} name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={personsToShow}></Persons>
    </div>
  )
}

export default App