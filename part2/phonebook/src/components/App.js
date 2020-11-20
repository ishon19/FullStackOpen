import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import contactService from "../services/serverService";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterString, setFilterString] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  const displayNotification = (message, type) => {
    setMessage(message);
    setMessageType(type);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const addContact = (event) => {
    event.preventDefault();
    let contactObj = { name: newName, phone: newNumber };

    //check if the name already exists
    let duplicate = persons.filter((person) => person.name === contactObj.name);
    if (duplicate.length === 0) {
      contactService
        .addContact(contactObj)
        .then((data) => {
          setPersons(persons.concat(data));
          setNewName("");
          setNewNumber("");
          displayNotification(`Added ${data.name}`, "success");
        })
        .catch((err) => {
          console.log(err.response);
          displayNotification(`Error: ${err.response.data.error}`, "error");
        });
    } else {
      if (
        window.confirm(
          alert(
            `${newName} already exists in the Phonebook, replace the old number with new one?`
          )
        )
      ) {
        contactService
          .updateContact(duplicate[0].id, contactObj)
          .then((updatedData) => {
            let modifiedList = persons.map((person) =>
              person.id === updatedData.id ? updatedData : person
            );
            setPersons(modifiedList);
            setNewName("");
            setNewNumber("");
            displayNotification(`Updated ${updatedData.name}`, "success");
          })
          .catch((err) => {
            console.log(err.response);
            displayNotification(`Error: ${err.response.data.error}`, "error");
          });
      }
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

  useEffect(() => {
    console.log("effect");
    contactService
      .getAll()
      .then((data) => {
        console.log("promise fulfilled");
        setPersons(data);
      })
      .catch((err) => {
        console.log(err.response);
        displayNotification(`Error: ${err.response.data.error}`, "error");
      });
  }, []);

  const deleteClickHandler = (id) => {
    let person = persons.find((person) => person.id === id);
    if (window.confirm(`Do you want to delete ${person.name}`)) {
      contactService
        .deleteContact(id)
        .then((data) => {
          let newContactList = persons.filter((person) => person.id !== id);
          setPersons(newContactList);
          setNewName("");
          setNewNumber("");
        })
        .catch((err) => {
          console.log(err.response);
          displayNotification(`Error: ${err.response.data.error}`, "error");
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageType={messageType} />
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
      <Persons
        data={persons}
        filterString={filterString}
        deleteClickHandler={deleteClickHandler}
      />
    </div>
  );
};

export default App;
