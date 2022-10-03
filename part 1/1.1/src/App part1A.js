const Header = (props) => {
  return (
    <h1>{props.header}</h1>
  )
}
const Total = (props) => {
  return (
    <p>
      Number of exercises: {props.items.reduce((sum, currentValue) => sum + currentValue.exercise, 0)}
    </p>
  )
}

const Part = (props) => {
  return (
    <p>{props.name} {props.exercise}</p>
  )
}

const Content = (props) => {
  const part = props.parts.map((item, index) =>
    <Part name={item.name} exercise={item.exercise} key={index} />
  )
  console.log(part)
  return (
    <>
      {part}
    </>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      { name: "Fundamentals of React", exercise: 10 },
      { name: "Using props to pass data", exercise: 7 },
      { name: "State of a component", exercise: 14 },
    ]
  }
  return (
    <div>
      <Header header={course.name} />
      <Content parts={course.parts} />
      <Total items={course.parts} />
    </div>
  );
}

export default App;
