// Load environment variables
require('dotenv').config();

// Import mongoose
const mongoose = require('mongoose');

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Log connection status
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB Atlas!');
});
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Define the Person schema
const personSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: Number,
  favoriteFoods: [String],
});

// Create the Person model
const Person = mongoose.model('Person', personSchema);

async function run() {
  try {
    // Create a new person
    const person = new Person({
      name: 'Alice',
      age: 30,
      favoriteFoods: ['pizza', 'pasta'],
    });
    const savedPerson = await person.save();
    console.log('Person saved:', savedPerson);

    // Create many people
    const manyPeople = [
      { name: 'Bob', age: 25, favoriteFoods: ['burger'] },
      { name: 'Mary', age: 22, favoriteFoods: ['salad'] },
      { name: 'John', age: 40, favoriteFoods: ['steak'] },
    ];
    const createdPeople = await Person.create(manyPeople);
    console.log('Many people created:', createdPeople);

    // Find people named Mary
    const marys = await Person.find({ name: 'Mary' });
    console.log('People named Mary:', marys);

    // Find person by ID (replace 'someObjectId' with an actual ObjectId string)
    const someObjectId = 'replace_with_actual_object_id';
    const personById = await Person.findById(someObjectId);
    console.log('Person by ID:', personById);
  } catch (err) {
    console.error('Error during database operations:', err);
  } finally {
    // Disconnect from database after operations
    mongoose.disconnect();
  }
}

run();