
import { useState } from 'react'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <h2>Counter: {count}</h2>
     <div>
      <button onClick={() => setCount(prev => prev + 1)}>increment</button>
      <button onClick={() => setCount(prev => prev - 1)} disabled = {count === 0}>decrement</button>
      <button onClick={() => setCount(0)}>reset</button>
     </div>
    </>
  )
}

export default App
