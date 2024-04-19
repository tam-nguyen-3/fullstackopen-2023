import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNum, setNewNum] = useState('')
  const [newFilter, setNewFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'notes')


  const addPerson = (event) => {
    event.preventDefault()
    const personObj = {
      name: newName,
      number: newNum
    }

    const currentNames = persons.map(person => person.name)

    if (currentNames.includes(personObj.name)){
      alert(`${newName} is already added to phonebook`)
    }

    else {
      // setPersons(persons.concat(personObj))
      // setNewName('')
      // setNewNum('')
      axios
        .post('http://localhost:3001/persons', personObj)
        .then(response => {
          console.log(response)
        })
    }
  }

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumChange = (event) => setNewNum(event.target.value)
  const handleFilterChange = (event) => setNewFilter(event.target.value)

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newFilter.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange}></Filter>

      <h3>Add a new</h3>

      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNum={newNum} handleNumChange={handleNumChange}></PersonForm>
      
      <h2>Numbers</h2>

      <Persons personList={personsToShow}></Persons>
    </div>
  )
}

export default App