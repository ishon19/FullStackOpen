import React, { useState } from "react";
import ReactDOM from "react-dom";

const Content = (props) => (
  <div>
    <h1>Give Feedback</h1>
    <Button text="Good" clickHandler={() => props.handleClick("good")} />
    <Button text="Neutral" clickHandler={() => props.handleClick("neutral")} />
    <Button text="Bad" clickHandler={() => props.handleClick("bad")} />
  </div>
);

const Button = ({ clickHandler, text }) => (
  <button onClick={clickHandler}>{text}</button>
);

const Stats = ({ data }) => {
  let good = data.good,
    bad = data.bad,
    neutral = data.neutral;
  let total = data.good + data.bad + data.neutral;
  let positive = good / total ?? 0;
  let avg = (1 * good + 0 * neutral + -1 * bad) / total ?? 0;
  return (
    <div>
      <h1>Statistics</h1>
      <p>Good {good}</p>
      <p>Neutral {neutral}</p>
      <p>Bad {bad}</p>
      <p>All {total}</p>
      <p>Average {avg}</p>
      <p>Positive {positive}%</p>
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const updateCounts = (feedbackType) => {
    switch (feedbackType) {
      case "good":
        setGood(good + 1);
        break;
      case "bad":
        setBad(bad + 1);
        break;
      case "neutral":
        setNeutral(neutral + 1);
        break;
      default:
        console.log("Default triggered");
    }
  };

  return (
    <div>
      <Content handleClick={updateCounts} />
      <Stats data={{ good: good, bad: bad, neutral: neutral }} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
