import { createStore, combineReducers, applyMiddleware } from "redux";
import reducer, { addAnecdoteAction } from "../reducers/anecdoteReducer";
import notificationReducer from "../reducers/notificationReducer";
import { composeWithDevTools } from "redux-devtools-extension";
import filterReducer from "../reducers/filterReducer";
import thunk from "redux-thunk";

const combinedReducer = combineReducers({
  notifications: notificationReducer,
  anecdotes: reducer,
  filter: filterReducer,
});
const store = createStore(
  combinedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
console.log(store.getState());
store.subscribe(() => console.log(store.getState()));
//store.dispatch(notificationAction("Alert!"));

export default store;
