import './App.css'
import { useState } from 'react'

const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const MostVoted = ({ anecdotes }) => {
  // const [mostVoted, setMostVoted] = useState(anecdotes[0])
  const index = anecdotes.reduce((bestIndexSoFar, currentlyTestedValue, currentlyTestedIndex, array) => {
    return currentlyTestedValue.votes > array[bestIndexSoFar].votes ? currentlyTestedIndex : bestIndexSoFar
  }, 0)

  const mostVoted = anecdotes[index]

  if (!mostVoted.votes) {
    return (
      <h3>No most voted anecdotes so far</h3>
    )
  }
  return (
    <div>
      <p>{mostVoted.text}</p>
      <p>has {mostVoted.votes} votes</p>
    </div>
  )
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    { text: 'If it hurts, do it more often.', votes: 0 },
    { text: 'Adding manpower to a late software project makes it later!', votes: 0 },
    { text: 'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 0 },
    { text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 0 },
    { text: 'Premature optimization is the root of all evil.', votes: 0 },
    { text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 0 },
    { text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 0 }
  ])

  const [selected, setSelected] = useState(0)
  const randomIndex = () => setSelected(getRndInteger(0, anecdotes.length - 1))

  const voteButton2 = () => {
    const copy = [...anecdotes]
    copy[selected].votes++
    setAnecdotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected].text}</p>
      <p>has {anecdotes[selected].votes} votes</p>

      <button onClick={voteButton2}>Vote</button>
      <button onClick={randomIndex}>Next anecdote</button>

      <h1>Anecdotes with most votes</h1>
      <MostVoted anecdotes={anecdotes} />
    </div>
  );
}

export default App;
