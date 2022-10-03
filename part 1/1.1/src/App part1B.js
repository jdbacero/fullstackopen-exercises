import { useState } from 'react'

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({ callback, name }) => <button onClick={callback}>{name}</button>

const App = (props) => {
  const [counter, setCounter] = useState(0)
  const incrementCounter = () => setCounter(counter + 1)
  const decrementCounter = () => setCounter(counter - 1)
  const resetCounter = () => setCounter(0)

  return (
    <div>
      <Display counter={counter} />
      <Button callback={incrementCounter} name="Add" />
      <Button callback={decrementCounter} name="Deduct" />
      <Button callback={resetCounter} name="Reset" />
    </div>
  )
}

export default App;
