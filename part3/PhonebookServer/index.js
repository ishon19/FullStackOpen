const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();
const Person = require("./models/person");
const { update } = require("./models/person");

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

//Error Handling middleware
const errorHandler = (error, request, response, next) => {
  console.log("[ErrorHandler] An Error Occured: ", error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformed id" });
  }
  next(error);
};

app.use(errorHandler);

let persons = [
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
];

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

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  /* const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end(); */
  Person.findByIdAndRemove(request.params.id)
    .then((result) => result.status(204).end())
    .catch((error) => next(error));
});

const generateId = () => {
  return Math.floor(Math.random() * 1000 + 1);
};

app.post("/api/persons", (request, response) => {
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

  //Check if the person already exists
  Person.findOne({ name: name })
    .then((person) => {
      console.log("Found a match: ", person.name);
    })
    .catch((error) => next(error));

  let person = new Person({
    name: name,
    phone: phone,
  });

  //persons = persons.concat(person);
  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

app.put("/api/persons/:id", (request, response) => {
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log("Server running at the port", PORT);
});
