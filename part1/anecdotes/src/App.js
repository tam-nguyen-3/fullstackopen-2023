import { useState } from 'react'

const Anecdote = ({anecdotes, points, index}) => {
  return (
    <>
    <p>{anecdotes[index]}</p>
    <p>has {points[index]} votes</p>
    </>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [points, setPoint] = useState(Array(8).fill(0))
  const [maxIndex, setMaxIndex] = useState(0)

  const voteClick = () => {
    const copyPoints = [...points]
    copyPoints[selected] += 1
    const max = Math.max(...copyPoints)
    const maxIndex = copyPoints.indexOf(max)
    setPoint(copyPoints)
    setMaxIndex(maxIndex)
  }

  return (
    <div>
      <div>
        <h1>Anecdote of the day</h1>
        <Anecdote anecdotes={anecdotes} points={points} index={selected}></Anecdote>
        <button onClick={voteClick}>vote</button>
        <button onClick={() => setSelected(Math.floor(Math.random() * 8))}>next anecdote</button>
      </div>

      <div>
        <h1>Anecdote with most votes</h1>
        <Anecdote anecdotes={anecdotes} points={points} index={maxIndex}></Anecdote>
      </div>
      
    </div>
  )
}

export default App