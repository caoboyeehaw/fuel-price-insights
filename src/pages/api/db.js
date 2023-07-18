import { MongoClient } from 'mongodb';

const uri = 'mongodb+srv://fueling:FHdWRObrHCqqZRhD@fuelprice.9ffrxzl.mongodb.net/'; // Replace with your MongoDB connection string
const dbName = 'FUEL_PRICE_PROJECT'; // Replace with your database name

let cachedClient = null;

export async function connectToDatabase() {
  if (cachedClient && cachedClient.isConnected()) {
    return cachedClient;
  }

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  cachedClient = client;

  return client;
}

export async function getDatabase() {
  const client = await connectToDatabase();
  return client.db(dbName);
}