import { getDatabase } from './db';

export default async function editProfileHandler(req, res) {
  try {
    const db = await getDatabase();
    const collection = db.collection('FUEL');

    if (req.method === 'POST') {
      const userData = req.body;

      if (!userData) {
        return res.status(400).json({ error: 'No user data provided' });
      }

      const userId = userData.id; // Assuming you have the user's ID in the request body

      if (!userId) {
        return res.status(400).json({ error: 'No user ID provided' });
      }

      // Delete the ID from the user data as we don't want to update it in the document
      delete userData.id;

      // Updating the user information in the database based on the user's ID
      const result = await collection.updateOne(
        { _id: userId }, // Filter to find the user by their ID
        { $set: userData } // Update the fields provided in the userData object
      );

      if (result.matchedCount === 1) {
        return res.status(200).json({ message: 'User profile updated successfully', userId });
      } else {
        return res.status(404).json({ error: 'User not found' });
      }
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}