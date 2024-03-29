import React from "react";
import { connect } from "react-redux";
import { filterAnecdotesAction } from "../reducers/filterReducer";

const Filter = (props) => {
  //const dispatch = useDispatch();

  const handleChange = (event) => {
    // input-field value is in variable event.target.value
    props.filterAnecdotesAction(event.target.value);
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

const mapDispatchToProps = {
  filterAnecdotesAction,
};

export default connect(null, mapDispatchToProps)(Filter);
