import { useState } from 'react'

function App() {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAllClicks] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    const value = left + 1
    setLeft(value)
    setTotal(value + right)
    setAllClicks([...allClicks, 'L'])
  }

  const handleRightClick = () => {
    const value = right + 1
    setRight(value)
    setTotal(value + left)
    setAllClicks([...allClicks, 'R'])
  }

  const hello = (who) => () => console.log('hello', who)

  return (
    <>
      {left}
      <Button text="Say hello" onClick={hello("Sima")} />
      <Button text="left" onClick={handleLeftClick} />
      <Button text="right" onClick={handleRightClick} />
      {right}
      <History allClicks={allClicks} />
      <p>total {total}</p>
    </>
  )
}

const Button = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
)

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <p>Press buttons</p>
    )
  }
  return (
    <p>{props.allClicks.join(' ')}</p>
  )
}

export default App
