/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");

app.use(express.json());
app.use(cors());
app.use(express.static("build"));

morgan.token("payload", function body(req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
);

/* let persons = [
  {
    id: 1,
    name: "Shreyans",
    number: 1234567,
  },
  {
    id: 2,
    name: "Test",
    number: 1234569,
  },
]; */

app.get("/", (request, response) => {
  response.send("<h1>App Home</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons);
  });
});

app.get("/info", (request, response) => {
  Person.find({}).then((result) => {
    let date = new Date();
    response.send(
      `<p>PhoneBook has info for ${result.length} people</p><p>${date}</p>`
    );
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  /* const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  } */
  Person.findById(request.params.id)
    .then((person) => {
      console.log("Person: ", person);
      return response.json(person);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  /* const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end(); */
  Person.findByIdAndRemove(request.params.id)
    .then((result) => response.status(204).end())
    .catch((error) => next(error));
});

/* const generateId = () => {
  return Math.floor(Math.random() * 1000 + 1);
}; */

app.post("/api/persons", (request, response, next) => {
  console.log("[POST Request] ", request.body);
  const body = request.body;
  if (!body.name) {
    return response.status(400).json({
      error: "Name missing",
    });
  } else if (!body.phone) {
    return response.status(400).json({
      error: "Phone Number missing",
    });
  }

  //search if duplicate name exists in the list
  let name = body.name;
  let phone = body.phone;

  /*   let duplicates = persons.filter(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicates.length) {
    return response.status(400).json({
      error: "name must be unique",
    });
  } */

  let person = new Person({
    name: name,
    phone: phone,
  });

  //persons = persons.concat(person);
  person
    .save()
    .then((savedPerson) => {
      response.json(savedPerson);
    })
    .catch((error) => {
      console.log("Error while saving");
      next(error);
    });
});

app.put("/api/persons/:id", (request, response, next) => {
  let name = request.body.name;
  let phone = request.body.phone;
  let person = {
    name: name,
    phone: phone,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      console.log("Updated User", updatedPerson);
      response.json(updatedPerson);
    })
    .catch((error) => next(error));
});

//Error Handling middleware
const errorHandler = (error, request, response, next) => {
  console.log("[ErrorHandler] An Error Occured: ", error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformed id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running at the port", PORT);
});
