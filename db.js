const { MongoClient } = require('mongodb');

const MONGODB_URI = 'mongodb+srv://hbaziz537:azizhb2003@cluster0.5ydfzoo.mongodb.net/?retryWrites=true&w=majority';

let db;

async function connectToDatabase() {
  if (db) {
    return db;
  }

  try {
    const client = await MongoClient.connect(MONGODB_URI);
    db = client.db();
    await db.collection('users').createIndex({email: 1},{unique:true })
    console.log('Connected to MongoDB');

    return db;
  } catch (err) {
    console.error('Error: ', err.codeName);
    throw err;
  }
}

module.exports = connectToDatabase;