import './App.css';
import { useState } from 'react';


const ReviewButton = ({ callback, review }) => {
  return (
    <button onClick={callback}>{review}</button>
  )
}

const Feedback = ({ reviews }) => {
  if (!reviews.total()) {
    return (
      <div>No feedback given</div>
    )
  }
  return (
    <table>
      <tbody>
        <StatisticLine text="good" value={reviews.good} />
        <StatisticLine text="neutral" value={reviews.neutral} />
        <StatisticLine text="bad" value={reviews.bad} />
        <StatisticLine text="all" value={reviews.total()} />
        <StatisticLine text="average" value={reviews.average()} />
        <StatisticLine text="positive" value={reviews.positive()} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  )
}

const App = () => {
  const [reviews, setReviews] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    score: 0,
    total() { return this.good + this.neutral + this.bad },
    average() { return this.total() ? (this.score / this.total()) * 100 + "%" : 0 + "%" },
    positive() { return this.good ? (this.good / this.total()) * 100 + "%" : 0 + "%" }
  })

  const handleReview = (review) => {
    if (review === "good") {
      return () => {
        setReviews({ ...reviews, good: reviews.good + 1, score: reviews.score + 1 })
      }
    }
    if (review === "neutral") {
      return () => {
        setReviews({ ...reviews, neutral: reviews.neutral + 1 })
      }
    }
    return () => {
      setReviews({ ...reviews, bad: reviews.bad + 1, score: reviews.score - 1 })
    }
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <ReviewButton callback={handleReview("good")} review="Good" />
      <ReviewButton callback={handleReview("neutral")} review="Neutral" />
      <ReviewButton callback={handleReview("bad")} review="Bad" />
      <h1>Statistics</h1>
      <Feedback reviews={reviews} />
    </div>
  )
}

export default App;
