import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateVoteAction } from "../reducers/anecdoteReducer";
import {
  notificationAction,
  removeNotificationAction,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .trim()
          .includes(state.filter.toLowerCase().trim())
      );
    }
    return state.anecdotes.sort((a, b) => b.votes - a.votes);
  });

  const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    dispatch(updateVoteAction(id));
    dispatch(
      notificationAction(
        `You upvoted '${
          anecdotes.find((anecdote) => anecdote.id === id).content
        }'`
      )
    );
    setTimeout(() => dispatch(removeNotificationAction()), 5000);
  };

  return (
    <div>
      {console.log(anecdotes)}
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
