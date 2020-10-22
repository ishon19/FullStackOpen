import React from "react";

const Search = ({ onChangeHandler }) => {
  return (
    <div>
      <p>
        Find Countries <input type="text" onChange={onChangeHandler} />
      </p>
    </div>
  );
};

export default Search;
