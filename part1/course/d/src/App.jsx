import { useState } from 'react'

function App() {
  const [clicks, setClicks] = useState({
    left: 0,
    right: 0
  })

  const handleLeftClick = () => setClicks({...clicks, left: clicks.left + 1})

  const handleRightClick = () => setClicks({...clicks, right: clicks.right + 1})

  return (
    <>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </>
  )
}

export default App
