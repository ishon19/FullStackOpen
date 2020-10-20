import React, { useState } from "react";
import Filter from "./Filter";
import Persons from "./Persons";
import PersonForm from "./PersonForm";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", phone: "123-456789" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");

  const addContact = (event) => {
    event.preventDefault();
    let contactObj = { name: newName, phone: newNumber };

    //check if the name already exists
    let duplicate = persons.filter((person) => person.name === newName);
    if (duplicate.length === 0) {
      setPersons(persons.concat(contactObj));
      setNewName("");
      setNewNumber("");
    } else {
      alert(`${newName} already exists in the Phonebook`);
    }
  };

  const handleContactName = (event) => {
    setNewName(event.target.value);
  };

  const handleContactNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFiltering = (e) => {
    setFilterString(e.target.value);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter eventHandler={handleFiltering} value={filterString} />
      <h2>Add a new</h2>
      <PersonForm
        contactNameHandler={handleContactName}
        contactNumberHandler={handleContactNumber}
        submitHandler={addContact}
        defaultName={newName}
        defaultNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Persons data={persons} filterString={filterString} />
    </div>
  );
};

export default App;
