import { useState, useEffect } from 'react'
import axios from 'axios'
import personService from './components/persons'

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

const Detail = ({name, number, handleClick}) => {
  return (
    <div>
      {/* <p key={name}>{name} {number}</p> <button onClick={handleClick}>delete</button> */}
      {name} {number} <button onClick={handleClick}>delete</button>
    </div>
  )
} 

const Persons = ({persons, handleClick}) => {
  return (
    persons.map((person) => <Detail key={person.id} name={person.name} number={person.number} handleClick={() => handleClick(person.id)}></Detail>)
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const personsToShow = (newFilter.length === 0) 
    ? persons
    : persons.filter((person) => {
      const name = person.name.toLowerCase()
      const filter = newFilter.toLowerCase()
      return (name.includes(filter))
    })

    /* one-liner:
    : persons.filter((person) => person.name.toLowerCase().includes(newFilter.toLowerCase()))
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

    const newPerson = {
      // id: persons.length + 1,
      name: newName,
      number: newNumber
    }

    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (confirm(`Delete ${personToDelete.name}?`)) {
      personService
      .remove(id)
      setPersons(persons.filter(p => p.id != id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={newFilter} handleChange={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm formHandler={addName} name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleClick={handleDelete}></Persons>
    </div>
  )
}

export default App