import { useState } from 'react'

const Header = ({header}) => <h1>{header}</h1>

// const DisplayVote = ({vote}) => {
//   if (vote === 0) {
//     return (<div>has 0 vote</div>)
//   }
//   return <div>has {vote} votes</div>
// } 

const Quote = ({quote, vote}) => {
  if (vote === 0) {
    return (
      <>
      <div>{quote}</div>
      <div>has 0 vote</div>
      </>
    )
  }
  return (
    <>
    <div>{quote}</div>
    <div>has {vote} vote</div>
    </>
  )
} 


const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  // const initialArr = Array(anecdotes.length).fill(0)
  // const [votes, setVotes] = useState(initialArr)

  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(anecdotes.map(_ => 0))
  const [mostVote, setMostVote] = useState(0)

  const handleNext = () => {
    let next = selected
    while (next === selected) {
      next = Math.floor(Math.random() * anecdotes.length)
    }
    setSelected(next)
  }

  const handleVote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
    if (newVotes[selected] > votes[mostVote]) {
      setMostVote(selected)
    }
  }

  const max = votes.reduce((a, b) => Math.max(a, b), -Infinity);

  return (
    <>
    <Header header='Anecdote of the day'></Header>
    <Quote quote={anecdotes[selected]} vote={votes[selected]}></Quote>
    <Button handleClick={handleVote} text='vote'></Button>
    <Button handleClick={handleNext} text='next anecdote'></Button>

    <Header header='Anecdote with most votes'></Header>
    <Quote quote={anecdotes[votes.indexOf(max)]} vote={max}></Quote>
    </>
  )
}

export default App