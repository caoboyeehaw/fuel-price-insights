import { getDatabase } from "./db";

export default async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ success: false, message: 'Both startDate and endDate are required.' });
  }

  try {
    const db = await getDatabase();
    const Fuel = db.collection('FUEL');  // Assuming 'fuel' is your collection name

    // Convert startDate and endDate to Date objects
    let start = new Date(startDate).toISOString();
    let end = new Date(endDate);
    end.setHours(23, 59, 59, 999);
    end = end.toISOString();
    
    const quotes = await Fuel.find({
      deliveryDate: {
        $gte: start,
        $lte: end,
      },
    }).toArray();

    res.status(200).json({ success: true, data: quotes });
  } catch (error) {
    res.status(400).json({ success: false });
  }
};
