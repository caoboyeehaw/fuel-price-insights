import { getDatabase } from './db';

export default async function clientProfileHandler(req, res) {
  if (req.method === 'POST') {
    const { fullName, address1, address2, city, state, zipcode } = req.body;

    if (!fullName || fullName.trim().length === 0) {
      return res.status(400).json({ error: 'Please enter a valid name' });
    }
    if (!address1 || address1.trim().length === 0) {
      return res.status(400).json({ error: 'Please enter a valid address' });
    }
    if (!city || city.trim().length === 0) {
      return res.status(400).json({ error: 'Please enter a valid city' });
    }
    if (!state || state.trim().length === 0) {
      return res.status(400).json({ error: 'Please enter a valid state' });
    }
    if (!zipcode || zipcode.trim().length !== 5) {
      return res.status(400).json({ error: 'Please enter a valid 5-digit zipcode' });
    }

    try {
      const db = await getDatabase();
      const collection = db.collection('ClientProfile');

      // Insert the client profile data into the 'ClientProfile' collection
      await collection.insertOne({
        fullName,
        address1,
        address2,
        city,
        state,
        zipcode,
      });

      return res.status(200).json({ message: 'Registration successful' });
    } catch (error) {
      console.error('Error:', error);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
