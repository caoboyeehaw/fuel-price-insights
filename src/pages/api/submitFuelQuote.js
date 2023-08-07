import { getDatabase } from './db';
import { getSession } from 'next-auth/react';

export default async function submitFuelQuoteHandler(req, res) {
  try {
    const session = await getSession({ req });
    console.log('Session in submitFuelQuoteHandler:', session);
    
    if (!session) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const email = session.user.email; 

    const db = await getDatabase();
    const collection = db.collection('FUEL');

    if (req.method === 'POST') {
      const quoteData = req.body;

      if (!quoteData) {
        return res.status(400).json({ error: 'No quote data provided' });
      }


      const result = await collection.insertOne({ ...quoteData, email });

      
      return res.status(200).json({ message: 'Quote submitted successfully (testing from api src\pages\api\submitFuelQuote.js)', quoteId: result.insertedId });
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}


