const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { users, thoughts } = require('./data_seeds');

connection.on('error', (error) => error);

connection.once('open', async () =>
{
    console.log('Successfully connected');

    // Delete all Users/Thoughts currently in the database
    await User.deleteMany({});
    await Thought.deleteMany({});

    // Add seed data to User/Thought collections
    await User.collection.insertMany(users);
    await Thought.collection.insertMany(thoughts);

    console.table(users);
    console.table(thoughts);

    console.log('Seeding complete.');
    process.exit(0);
})