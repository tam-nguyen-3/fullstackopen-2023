import { useState, useEffect } from 'react'
import Notification from './components/Notification'
import Error from './components/Error'
import personService from './services/persons'

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
  const [message, setMessage] = useState(null)
  const [error, setErrorMessage] = useState(null)

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

    const thePerson = persons.find(p => p.name === newName)
    if (persons.includes(thePerson)) {
      if (confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        const updatedPerson = {...thePerson, number: newNumber}

        personService
        .update(updatedPerson.id, updatedPerson)
        .then(returnedPerson => {
          // success notification
          setMessage(`Added ${updatedPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)

          setPersons(persons.map(p => p.name === newName ? returnedPerson : p))
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorMessage(`Information of ${updatedPerson.name} has already been removed from server`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
      }
    }

    else {
      const newPerson = {
        name: newName,
        number: newNumber
      }
  
      personService
        .create(newPerson)
        .then(returnedPerson => {
          setMessage(`Added ${newPerson.name}`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)

          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const handleDelete = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (confirm(`Delete ${personToDelete.name}?`)) {
      personService
      .remove(id)
      .then()
      .catch(error => {
        setErrorMessage(`Information of ${personToDelete.name} has already been removed from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
      setPersons(persons.filter(p => p.id != id))
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}></Notification>
      <Error message={error}></Error>
      <Filter filter={newFilter} handleChange={handleFilterChange}></Filter>
      <h2>add a new</h2>
      <PersonForm formHandler={addName} name={newName} handleName={handleNameChange} number={newNumber} handleNumber={handleNumberChange}></PersonForm>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleClick={handleDelete}></Persons>
    </div>
  )
}

export default App