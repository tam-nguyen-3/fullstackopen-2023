import { useState } from 'react'

const Header = ({header}) => <h1>{header}</h1>

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const all = good + neutral + bad

  if (all === 0) {
    return (
      <>
      <Header header="statistics"></Header>
      <div>No feedback given</div>
      </>
    )
  }

  return (
    <>
    <Header header="statistics"></Header>
    <table>
      <tbody>
        <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        <StatisticLine text="all" value={good+neutral+bad}></StatisticLine>
        <StatisticLine text="average" value={(good - bad)/all}></StatisticLine>
        <StatisticLine text="positive" value={good / all * 100 + '%'}></StatisticLine>
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => {
    setGood(good + 1)
  }
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  } 
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
    <Header header="give feedback"></Header>
    <Button handleClick={handleGood} text='good'></Button>
    <Button handleClick={handleNeutral} text='neutral'></Button>
    <Button handleClick={handleBad} text='bad'></Button>

    <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </div>
  )
}

export default App