const { getDatabase } = require('./db');

async function testDatabase() {
  const db = await getDatabase();
  
  // Fetch all documents in a hypothetical collection named 'test'
  const collection = db.collection('test');
  const documents = await collection.find().toArray();
  
  console.log(documents);
}

testDatabase().catch(console.error);