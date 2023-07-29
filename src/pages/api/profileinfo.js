import { getDatabase } from './db';
import bcrypt from 'bcrypt';

export default async function registrationHandler(req, res) {
  const db = await getDatabase();
  const collection = db.collection('ClientInfo');

  if (req.method === 'POST') {
    const { email, password } = req.body;


    if (!email || email.trim().length === 0) {
      return res.status(400).json({ error: 'Please enter a valid email' });
    }
    if (!password || password.trim().length === 0) {
      return res.status(400).json({ error: 'Please enter a valid password' });
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    // Checking if email is in use
    const existingUser = await collection.findOne({ email });

    if(existingUser){
      return res.status(400).json({ error: 'Email is already in use!' });
    }

    // Inserting the new user into the database
    await collection.insertOne({
      email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: 'Registration successful' });
  
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}



