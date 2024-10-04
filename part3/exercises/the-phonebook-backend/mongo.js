const mongoose = require('mongoose');

const password = process.env.PASSWORD;

const url = `mongodb+srv://serafimkvashnin:${password}@fullstackopen.zzchu.mongodb.net/phonebook?retryWrites=true&w=majority&appName=FullstackOpen`;

mongoose.set('strictQuery', false);

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length < 3) {
  console.log('Phonebook:');
  Person.find().then((result) => {
    if (result.length > 0) {
      result.forEach((person) => {
        console.log(` - ${person.name} ${person.number}`);
      });
    } else {
      console.log(' - empty');
    }
    mongoose.connection.close();
  });
} else {
  const person = new Person({
    name: process.argv[2],
    number: process.argv[3],
  });

  person.save().then((result) => {
    console.log(
      `Added ${result.name} number ${result.number} to phonebook`
    );
    mongoose.connection.close();
  });
}
