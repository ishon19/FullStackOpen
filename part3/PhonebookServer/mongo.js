/* eslint-disable no-undef */
const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

if (process.argv.length < 3) {
  console.log("Kindly enter the password atleast");
  process.exit(1);
}

const password = process.argv[2];
const name = process?.argv[3];
const phone = process?.argv[4];

const url = `mongodb+srv://ishon:${password}@cluster0.ecj5l.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, {
  useNewUrlParser: true,
  useFindAndModify: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const personSchema = mongoose.Schema({
  name: { type: String, required: true, unique: true },
  phone: { type: Number, required: true },
});

personSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

personSchema.plugin(uniqueValidator);
const Person = mongoose.model("Person", personSchema);

if (name === undefined && phone === undefined) {
  //display all the records
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(`${person.name} ${person.phone}`);
    });
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: name,
    phone: phone,
  });

  person.save().then((result) => {
    console.log(`Added ${name} ${phone} to phonebook`);
    mongoose.connection.close();
  });
}

//find the person
Person.findOne({ name: name }).then((response) => {
  if (response) console.log(response);
  mongoose.connection.close();
});
