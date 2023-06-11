const PersonForm = ({addPerson, newName, newNum, handleNameChange, handleNumChange}) => {
    return (
      <form onSubmit={addPerson}>
          <div>
            name: <input value={newName} onChange={handleNameChange}></input>
          </div>
          <div>
            number: <input value={newNum} onChange={handleNumChange}></input>
          </div>
          <div>
            <button type="submit">add</button>
          </div>
        </form>
    )
  }

export default PersonForm