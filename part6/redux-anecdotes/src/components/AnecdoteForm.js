import React from "react";
import { connect } from "react-redux";
import { addAnecdoteAction } from "../reducers/anecdoteReducer";
import anecdotes from "../services/anecdotes";

const AnecdoteForm = (props) => {
  //const dispatch = useDispatch();

  const addAnecdote = async (event) => {
    event.preventDefault();
    const anecdote = event.target.anecdote.value;
    props.addAnecdoteAction(anecdote);
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = {
  addAnecdoteAction,
};

export default connect(null, mapDispatchToProps)(AnecdoteForm);
