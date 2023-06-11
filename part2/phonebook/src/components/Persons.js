const Person = ({person}) => <p> {person.name} {person.number} </p>

const Persons = ({personList}) => {
  return (
    personList.map(person => <Person key={person.name} person={person}></Person>)
  )
}

export default Persons