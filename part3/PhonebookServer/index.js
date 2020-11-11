const express = require("express");
const morgan = require("morgan");
const app = express();

app.use(express.json());

morgan.token("payload", function body(req) {
  return JSON.stringify(req.body);
});

app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :payload"
  )
);

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
  response.json(persons);
});

app.get("/info", (request, response) => {
  let peopleCount = persons.length;
  let date = new Date();
  response.send(
    `<p>PhoneBook has info for ${peopleCount} people</p><p>${date}</p>`
  );
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
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
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

  let duplicates = persons.filter(
    (person) => person.name.toLowerCase() === name.toLowerCase()
  );

  if (duplicates.length) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }

  let person = {
    id: generateId(),
    name: name,
    phone: body.phone,
  };

  persons = persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server running at the port", PORT);
});
