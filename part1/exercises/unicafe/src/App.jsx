import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedback = [
    {
      name: "good",
      count: good,
      leaveFeedback: () => setGood(good + 1)
    },
    {
      name: "neutral",
      count: neutral,
      leaveFeedback: () => setNeutral(neutral + 1)
    },
    {
      name: "bad",
      count: bad,
      leaveFeedback: () => setBad(bad + 1)
    }
  ]

  return (
    <>
      <Feedback feedback={feedback}/>
      <Statistics feedback={feedback}/>
    </>
  )
}

const Button = ({ text, onClick }) => <button onClick={onClick}>{text}</button>

const Feedback = ({ feedback }) => (
  <div>
    <h1>give feedback</h1>
    {feedback.map((item, i) => <Button key={i} text={item.name} onClick={item.leaveFeedback}/>)}
  </div>
)

const Statistics = ({ feedback }) => (
  <div>
    <h1>statistics</h1>
    {feedback.map((item, i) => <p key={i}>{item.name} {item.count}</p>)}
  </div>
) 

export default App
