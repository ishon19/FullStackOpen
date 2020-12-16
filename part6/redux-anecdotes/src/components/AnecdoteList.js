import React from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { updateVoteAction } from "../reducers/anecdoteReducer";
import {
  notificationAction,
  removeNotificationAction,
} from "../reducers/notificationReducer";

const AnecdoteList = (props) => {
  /* const anecdotes = useSelector((state) => {
    if (state.filter) {
      return state.anecdotes.filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .trim()
          .includes(state.filter.toLowerCase().trim())
      );
    }
    return state.anecdotes.sort((a, b) => b.votes - a.votes);
  }); */

  //const dispatch = useDispatch();

  const vote = (id) => {
    console.log("vote", id);
    /* dispatch(updateVoteAction(id));
    dispatch(
      notificationAction(
        `You upvoted '${
          anecdotes.find((anecdote) => anecdote.id === id).content
        }'`,
        3
      )
    ); */
    props.updateVoteAction(id);
    props.notificationAction(
      `You upvoted '${
        props.anecdotes.find((anecdote) => anecdote.id === id).content
      }'`,
      3
    );
  };

  return (
    <div>
      {console.log(props.anecdotes)}
      {props.anecdotes.map((anecdote) => (
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

const mapStateToProps = (state) => {
  if (state.filter) {
    return {
      anecdotes: state.anecdotes.filter((anecdote) =>
        anecdote.content
          .toLowerCase()
          .trim()
          .includes(state.filter.toLowerCase().trim())
      ),
    };
  }
  return {anecdotes: state.anecdotes.sort((a, b) => b.votes - a.votes)};
};

const mapDispatchToProps = {
  updateVoteAction,
  notificationAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
