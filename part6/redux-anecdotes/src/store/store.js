import { createStore, combineReducers } from "redux";
import reducer, { addAnecdoteAction } from "../reducers/anecdoteReducer";
import notificationReducer from "../reducers/notificationReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import filterReducer from "../reducers/filterReducer";

const combinedReducer = combineReducers({
  notifications: notificationReducer,
  anecdotes: reducer,
  filter: filterReducer,
});
const store = createStore(combinedReducer, composeWithDevTools());
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));
store.dispatch(addAnecdoteAction("Test Anecdote"));
//store.dispatch(notificationAction("Alert!"));

export default store;
