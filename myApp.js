require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String]
});

let PersonModel = mongoose.model("Person", personSchema);

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
  done(null /*, data*/);
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  done(null /*, data*/);
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  done(null /*, data*/);
};

const removeById = (personId, done) => {
  done(null /*, data*/);
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  done(null /*, data*/);
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
