import { useState } from "react"

const CounterDisplay = ({ counter }) => <div> {counter} </div>

const Button = ({ text, onClick }) => <button onClick={onClick}>{ text }</button>

const App = () => {
  const [ counter, setCounter ] = useState(0)
  
  const increaseCounter = () => setCounter(counter + 1)
  const decreaseCounter = () => setCounter(counter - 1)
  const zeroCounter = () => setCounter(0)

  return (
    <>
      <CounterDisplay counter={counter} />
      <Button text="plus" onClick={increaseCounter} />
      <Button text="minus" onClick={decreaseCounter} />
      <Button text="zero" onClick={zeroCounter} />
    </>
  )
}

export default App
