import React from "react";

const Filter = ({ eventHandler, value }) => (
  <p>
    Filter Contacts: <input onChange={eventHandler} value={value} />
  </p>
);

export default Filter;
