import React, { useState } from "react";
import ReactDOM from "react-dom";

const NextButton = ({ clickHandler }) => {
  return <button onClick={clickHandler}>Next Anecdote</button>;
};

const VoteButton = ({ clickHandler }) => {
  return <button onClick={clickHandler}>Vote</button>;
};

const Content = ({ type, text, data, index }) => {
  let popularIndex = 0;
  let maxvotes = 0;
  data.forEach((item, idx) => {
    if (item > maxvotes) {
      maxvotes = item;
      popularIndex = idx;
    }
  });
  return (
    <div>
      <h1>{text}</h1>
      {type === "popular" ? anecdotes[popularIndex] : anecdotes[index]}
      <br />
      <p>It has {type === "popular" ? data[popularIndex] : data[index]} votes</p>
    </div>
  );
};

const App = (props) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(new Array(anecdotes.length).fill(0));

  const switchAnecdote = () => {
    let randomIndex = Math.floor(Math.random() * anecdotes.length + 1) - 1;
    setSelected(randomIndex);
  };

  const updateVotes = () => {
    const toSet = [...points];
    toSet[selected]++;
    setPoints(toSet);
  };

  return (
    <div>
      <Content
        type="general"
        text="Anecdote of the day"
        data={points}
        index={selected}
      />
      <VoteButton clickHandler={updateVotes} />
      <NextButton clickHandler={switchAnecdote} />
      <br />
      <Content
        type="popular"
        text="Anecdote with most votes"
        data={points}
        index={selected}
      />
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
