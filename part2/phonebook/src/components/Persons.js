import React from "react";

const Persons = ({ data, filterString, deleteClickHandler }) => {
  const displayAllContacts = (data) => {
    return data.map((person) => (
      <p key={person.name}>
        {person.name} {person.phone}{" "}
        <button onClick={() => deleteClickHandler(person.id)}>delete</button>
      </p>
    ));
  };

  const displayFilteredContacts = (data, filterString) => {
    let filteredList = data.filter((person) =>
      person.name.toLowerCase().includes(filterString.toLowerCase())
    );
    return filteredList.map((person) => (
      <p key={person.name}>
        {person.name} {person.phone}{" "}
        <button onClick={() => deleteClickHandler(person.id)}>delete</button>
      </p>
    ));
  };

  return (
    <div>
      {filterString.trim() === ""
        ? displayAllContacts(data)
        : displayFilteredContacts(data, filterString)}
    </div>
  );
};

export default Persons;
