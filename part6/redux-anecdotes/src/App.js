import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";
import { initAnecdotes } from "./reducers/anecdoteReducer";
import anecdotes from "./services/anecdotes";

const App = () => {
  const dispatch = useDispatch();
  //fetch all the anecdotes from the server
  useEffect(() => {
    anecdotes
      .getAnecdotes()
      .then((anecdoteList) => dispatch(initAnecdotes(anecdoteList)));
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteForm />
      <AnecdoteList />
    </div>
  );
};

export default App;
