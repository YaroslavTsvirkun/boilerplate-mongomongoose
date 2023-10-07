require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const PersonSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let PersonModel = mongoose.model("Person", PersonSchema);

const createAndSavePerson = function(done) {
  var jonDoe = new PersonModel({ name: "Jon Doe", age: 31, favoriteFoods: ["beer", "fish"] });

  jonDoe.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

let arrayOfPeople = [
  new PersonModel({ name: "Mars", age: 74, favoriteFoods: ["Del Taco"] }),
  new PersonModel({ name: "Sol", age: 76, favoriteFoods: ["roast chicken"] }),
  new PersonModel({ name: "Unona", age: 78, favoriteFoods: ["wine"] })
];

const createManyPeople = (arrayOfPeople, done) => {
  PersonModel.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    people.save(function(err, data) {
      if (err) return console.error(err);
      done(null, data)
    });
    done(null, people);
  });
};

const findPeopleByName = (personName, done) => {
  PersonModel.find({ name: personName }, function(err, personFound) {
    if (err) return console.log(err);
    done(null, personFound);
  });
};

const findOneByFood = (food, done) => {
  PersonModel.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findPersonById = (personId, done) => {
  PersonModel.findById(personId, function(err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  PersonModel.findById(personId, function(err, person) {
    if (err) return console.log(err);
    person.favoriteFoods.push(foodToAdd);
    person.save(function(err, updatedPerson) {
      if (err) return console.log(err);
      done(null, updatedPerson);
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  PersonModel.findOneAndUpdate({ name: personName }, { age: ageToSet }, { new: true },
    function(err, updatedDoc) {
      if (err) return console.log(err);
      done(null, updatedDoc);
    }
  );
};

const removeById = (personId, done) => {
  PersonModel.findByIdAndRemove(personId, function(err, removedDoc) {
    if (err) return console.log(err);
    done(null, removedDoc);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  PersonModel.remove({ name: nameToRemove }, function(err, response) {
    if (err) return console.log(err);
    done(null, response);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------
exports.PersonModel = PersonModel;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
