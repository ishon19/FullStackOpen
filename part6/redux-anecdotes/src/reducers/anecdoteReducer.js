import anecdoteService from "../services/anecdotes";

const anecdotesAtStart = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

const getId = () => (100000 * Math.random()).toFixed(0);

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  };
};

export const updateVoteAction = (id) => {
  return async (dispatch) => {
    await anecdoteService.upvote(id);
    dispatch({
      type: "UPDATE_VOTES",
      id,
    });
  };
};

export const addAnecdoteAction = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.addAnecdote(anecdote);
    dispatch({
      type: "ADD_ANECDOTE",
      newAnecdote,
    });
  };
};

export const initAnecdotes = () => {
  return async (dispatch) => {
    const initialAnecdotes = await anecdoteService.getAnecdotes();
    console.log("INIT: ", initialAnecdotes);
    dispatch({
      type: "INIT_ANECDOTES",
      anecdotes: initialAnecdotes,
    });
  };
};

const initialState = anecdotesAtStart.map(asObject);

const reducer = (state = [], action) => {
  console.log("state now: ", state);
  console.log("action", action);
  switch (action.type) {
    case "UPDATE_VOTES":
      return state.map((anecdote) => {
        if (anecdote.id === action.id) {
          anecdote.votes++;
        }
        return anecdote;
      });
    case "ADD_ANECDOTE":
      //return state.concat(asObject(action.anecdote));
      return state.concat(action.anecdote);
    case "INIT_ANECDOTES":
      return action.anecdotes;
    default:
      return state.sort((a, b) => a.votes - b.votes);
  }
};

export default reducer;
