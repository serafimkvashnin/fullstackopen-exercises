import { useState } from 'react'

const getRandomInRange = (min, max) => {
  const minCeiled = Math.ceil(min);
  const maxFloored = Math.floor(max);
  return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled);
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

  const [selected, setSelected] = useState(0)

  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  const [mostVoted, setMostVoted] = useState(-1)

  const showNextAnecdote = () => {
    const randomIndex = getRandomInRange(0, anecdotes.length)
    setSelected(randomIndex)
  }

  const voteForAnecdote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1

    if (mostVoted === -1 || newVotes[selected] > votes[mostVoted]) {
      setMostVoted(selected)
    }

    setVotes(newVotes)
  }

  return (
    <div>
      <AnecdoteOfTheDay 
        anecdote={anecdotes[selected]} 
        votesCount={votes[selected]}
      />
      <Button text="vote" onClick={voteForAnecdote}/>
      <Button text="next anecdote" onClick={showNextAnecdote}/>
      <MostVotedAnecdote 
        anecdotes={anecdotes} 
        mostVoted={mostVoted}
      />
    </div>
  )
}

const AnecdoteOfTheDay = ({ anecdote, votesCount }) => <>
  <h1>Anecdote of the day</h1>
  <p>{anecdote}</p>
  <p>Has {votesCount} votes</p>
</>

const MostVotedAnecdote = ({ anecdotes, mostVoted }) => {
  return (
    <>    
      <h1>Anecdote with most votes</h1>
      <p>{mostVoted > -1 ? anecdotes[mostVoted] : "Vote for anecdote you like"}</p>
    </>
  )
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

export default App
