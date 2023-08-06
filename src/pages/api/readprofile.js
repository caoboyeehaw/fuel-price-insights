import { getDatabase } from "./db";

export default async (req, res) => {
  const { userId } = req.query;

  if (!userId) {
    return res.status(400).json({ success: false, message: 'userId is required.' });
  }

  try {
    const db = await getDatabase();
    const Users = db.collection('Users');  // Users is collection name
    
    const userProfile = await Users.findOne({
      _id: userId,
    });

    if (!userProfile) {
      return res.status(404).json({ success: false, message: 'User not found.' });
    }

    res.status(200).json({ success: true, data: userProfile });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};