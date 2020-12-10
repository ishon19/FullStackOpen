import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateVoteAction } from "../reducers/anecdoteReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) =>
    state.sort((a, b) => b.votes - a.votes)
  );

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(updateVoteAction(id));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
