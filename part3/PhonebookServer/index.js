const express = require("express");
const app = express();

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

const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server running at the port ", PORT);
});
