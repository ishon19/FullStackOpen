export const filterAnecdotesAction = (filterString) => {
  return {
    type: "FILTER",
    filterString,
  };
};

const filterReducer = (state = "", action) => {
  console.log("Filter Reducer");
  switch (action.type) {
    case "FILTER":
      return action.filterString;
    default:
      return state;
  }
};

export default filterReducer;
