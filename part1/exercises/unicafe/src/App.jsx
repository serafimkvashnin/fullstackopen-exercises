import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const feedback = {
    good: {
      count: good,
      leaveFeedback: () => setGood(good + 1)
    },
    neutral: {
      count: neutral,
      leaveFeedback: () => setNeutral(neutral + 1)
    },
    bad: {
      count: bad,
      leaveFeedback: () => setBad(bad + 1)
    }
  }

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
    {Object.entries(feedback).map(([key, item], i) => 
      <Button 
        key={i} 
        text={key} 
        onClick={item.leaveFeedback}
      />
    )}
  </div>
)

const calculateStatistics = (feedback) => {
  const good = feedback.good.count
  const neutral = feedback.neutral.count
  const bad = feedback.bad.count
  const totalFeedback = good + neutral + bad

  if (!totalFeedback) return null

  const averageScore = (good - bad) / totalFeedback
  const positivePercentage = good / totalFeedback * 100

  return { totalFeedback, averageScore, positivePercentage }
}

const Statistics = ({ feedback }) => {
  const statistics = calculateStatistics(feedback)

  if (!statistics) return <p>No feedback given</p>

  const { totalFeedback, averageScore, positivePercentage } = statistics
  
  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
        {Object.entries(feedback).map(([key, item], i) => <StatisticLine key={i} name={key} value={item.count}/>)}
        <StatisticLine name="all" value={totalFeedback}/>
        <StatisticLine name="average" value={averageScore}/>
        <StatisticLine name="positive" value={positivePercentage + "%"}/>
        </tbody>
      </table>
    </div>
  ) 
}

const StatisticLine = ({ name, value }) => <tr>
  <td>{name}</td> 
  <td>{value}</td>
</tr>

export default App
