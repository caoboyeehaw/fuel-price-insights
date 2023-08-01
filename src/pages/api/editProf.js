import { getDatabase } from './db';

export default async function editProfHandler(req, res) {
  try {
    const db = await getDatabase();
    const collection = db.collection('ClientInfo');

    if (req.method === 'POST') {
      const clientData = req.body;

      if (!clientData) {
        return res.status(400).json({ error: 'No quote data provided' });
      }

      // Inserting the new quote into the database
      const updateResult = await collection.updateMany(
        { name: { $in: ['Guy Fieri'] } }, // Filter to find the documents to update
        {
            $set: {
              name: data.name,
              email: data.email,
              address1: data.address1,
              address2: data.address2,
              city: data.city,
              state: data.state,
              zipcode: data.zipcode,
              password: data.password
            },
          } // The new data you want to set for the matching documents
        );

      // Return a success message after successful submission
      return res.status(200).json({ message: 'Profile updated successfully (testing from api src\pages\api\editProf.js)', quoteId: result.insertedId });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}