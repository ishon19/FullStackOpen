import React from "react";

const Persons = ({ data, filterString }) => {
  return (
    <div>
      {filterString.trim() === ""
        ? displayAllContacts(data)
        : displayFilteredContacts(data, filterString)}
    </div>
  );
};

const displayAllContacts = (data) => {
  return data.map((person) => (
    <p key={person.name}>
      {person.name} {person.phone}
    </p>
  ));
};

const displayFilteredContacts = (data, filterString) => {
  let filteredList = data.filter((person) =>
    person.name.toLowerCase().includes(filterString.toLowerCase())
  );
  return filteredList.map((person) => (
    <p key={person.name}>
      {person.name} {person.phone}
    </p>
  ));
};

export default Persons;
