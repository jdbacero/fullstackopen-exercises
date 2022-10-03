const Hello = (props) => {
  return (
    <div>
      <p>Hello, {props.name}. You are {props.age} years old.</p>
    </div>
  )
}

const App = () => {
  console.log("Hello world.")
  const [now, a, b] = [new Date(), 10, 20]
  return (
    <div>
      <p>Greetings</p>
      <Hello />
      <Hello name="Rex" age="24" />
      <Hello name="Rex" age={a + b} />
      <p>
        Today is {now.toString()}.
      </p>
      <p>
        {a} plus {b} is {a + b}.
      </p>
    </div>
  );
}

export default App;
