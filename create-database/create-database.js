// insert one data to database
db.animals.insertOne({
  name: "Fluffy",
  age: 3,
  breed: "Golden Retriever",
  type: "Dog",
});

//insert many at one go

db.animals.insertMany([
  {
    name: "Dazzy",
    age: 5,
    type: "Dog",
  },
  {
    name: "Timmy",
    age: 1,
    breed: "Border Collie",
    type: "Dog",
  },
]);

//update an existing document in the database
//replace with an entirely new document
//first param will be the criteria of the documents.
// all doc that matched the criteria will be updated.

db.animals.updateOne(
  {
    _id: ObjectId("6362071b04f9b5f38060ad42"),
  },
  {
    $set: {
      name: "Thunder",
      age: 1.5,
      type: Dog,
    },
  }
);

//to del a doc from collection
db.animals.deleteOne({
  _id: ObjectId("6362071b04f9b5f38060ad42"),
});

// add an item to an array in a doc
//$push to push data into an array of collection
db.animals.updateOne(
  {
    _id: ObjectId("6362071b04f9b5f38060ad41"),
  },
  {
    $push: {
      checkup: {
        _id: ObjectId(), // create an ObjectId automatically when its empty
        name: "Dr.Tan",
        diagnosis: "Diabetes",
        treatement: "Medication",
      },
    },
  }
);

// to remove from an array we use $pull
db.animals.updateOne(
  {
    _id: ObjectId("6362068904f9b5f38060ad40"),
  },
  {
    $push: {
      _id: ObjectId(),
      name: "Dr.Pua",
      diagnosis: "Flu",
      treatment: "Pills",
    },
  }
);

//change one field in an object that inside an array of object
db.animals.updateOne(
  {
    _id: ObjectId("6362071b04f9b5f38060ad41"),
    checkups: {
      $elemMatch: {
        _id: ObjectId("63620a0604f9b5f38060ad43"),
      },
    },
  },
  {
    $set: {
      "checkups.$.name": "Dr su",
    },
  }
);
