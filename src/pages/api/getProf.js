import { getDatabase } from './db';

export default async function editProfHandler(req, res) {
  try {
    const db = await getDatabase();
    const collection = db.collection('ClientInfo');

    if (req.method === 'POST') {
      const clientData = req.body;

      // Check if clientData contains all required properties
      const requiredFields = ['name', 'email', 'address1', 'address2', 'city', 'state', 'zipcode', 'password'];

      for (const field of requiredFields) {
        if (!clientData[field]) {
          return res.status(400).json({ error: `Missing or invalid ${field}` });
        }
      }

      // Inserting the new data into the database
      const updateResult = await collection.updateOne(
        {  name: 'Guy Fieri'  }, // Filter to find the document to update using the email
        {
          $set: {
            name: clientData.name,
            email: clientData.email,
            address1: clientData.address1,
            address2: clientData.address2,
            city: clientData.city,
            state: clientData.state,
            zipcode: clientData.zipcode,
            password: clientData.password,
          },
        } // The new data you want to set for the matching document
      );

      // Check if the document was found and updated
      if (updateResult.modifiedCount === 1) {
        // Return a success message after successful update
        return res.status(200).json({ message: 'Profile updated successfully (testing from api src\pages\api\editProf.js)' });
      } else {
        // Return an error if the document was not found
        return res.status(404).json({ error: 'Client not found' });
      }
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An unexpected error occurred.' });
  }
}

export async function getProf(email) {
  try {
    const db = await getDatabase();
    const Fuel = db.collection('ClientInfo'); // FUEL is collection name

    // Query the database to find the document with the given email
    const clientInfo = await Fuel.findOne({ email });

    if (clientInfo) {
      // Destructure the clientInfo object to get the desired fields
      const { name, address1, address3, city, state, zipcode } = clientInfo;

      // Now you can use the variables as needed
      console.log(name);
      console.log(email);
      console.log(address1);
      console.log(address3);
      console.log(city);
      console.log(state);
      console.log(zipcode);
    } else {
      console.log('No client found with the provided email.');
    }
  } catch (error) {
    console.error('Error retrieving data from MongoDB:', error);
  }
}


