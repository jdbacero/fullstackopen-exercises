import { useState } from 'react'

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  const [allClicks, setAllClicks] = useState([])

  const handleLeftClick = () => {
    setAllClicks(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {

    setAllClicks(allClicks.concat('R'))
    setRight(right + 1)
  }

  const Button = ({ callback, name }) => <button onClick={callback}>{name}</button>
  // const [clicks, setClicks] = useState({
  //   left: 0,
  //   right: 0
  // })
  // const handleLeftClick = () => { setClicks({ ...clicks, left: clicks.left + 1 }) }
  // const handleRightClick = () => setClicks({ ...clicks, right: clicks.right + 1 })

  return (
    <div>
      {left}
      <Button callback={handleLeftClick} name="Left" />
      {right}
      <Button callback={handleRightClick} name="Right" />
      <History allClicks={allClicks} />
      {/* <p>{allClicks.join(' ')}</p> */}
    </div>
  )
}

export default App;
