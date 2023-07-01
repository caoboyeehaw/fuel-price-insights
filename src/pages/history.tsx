//Nibras Sultan
import { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Home() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fuelQuotes, setFuelQuotes] = useState([]);

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Function to generate sample fuel price quotes
  const generateSampleFuelQuotes = () => {
    const sampleQuotes = [
      {
        date: '2023-06-01',
        gallons: 50,
        clientLocation: 'New York',
        fuelRate: 2.5,
        finalPrice: 125
      },
      // Add more sample quotes here
    ];
    const filteredQuotes = sampleQuotes.filter((quote) => {
        return quote.date >= startDate && quote.date <= endDate;
      });
    setFuelQuotes(filteredQuotes);
  };

  return (
    <div className="flex flex-col min-h-screen py-6">
      <Navbar />
      <div className="mt-4 border-b-2 border-gray-200">
        <h1 className="text-2xl font-bold mb-4">Fuel Quote History</h1>
        <div>
          <label htmlFor="start-date">Start Date:</label>
          <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} />
        </div>
        <div>
          <label htmlFor="end-date">End Date:</label>
          <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} />
        </div>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded" onClick={generateSampleFuelQuotes}>
            Retrieve Quote History
          </button>
        </div>
        {fuelQuotes.length > 0 && (
          <table className="mt-4 border border-gray-200">
            <thead>
              <tr>
                <th className="border-b font-medium text-sm text-gray-700 px-4 py-2">Date</th>
                <th className="border-b font-medium text-sm text-gray-700 px-4 py-2"># of Gallons</th>
                <th className="border-b font-medium text-sm text-gray-700 px-4 py-2">Client Location</th>
                <th className="border-b font-medium text-sm text-gray-700 px-4 py-2">Fuel Rate</th>
                <th className="border-b font-medium text-sm text-gray-700 px-4 py-2">Final Price</th>
              </tr>
            </thead>
            <tbody>
              {fuelQuotes.map((quote, index) => (
                <tr key={index}>
                  <td className="border-b px-4 py-2">{quote.date}</td>
                  <td className="border-b px-4 py-2">{quote.gallons}</td>
                  <td className="border-b px-4 py-2">{quote.clientLocation}</td>
                  <td className="border-b px-4 py-2">{quote.fuelRate}</td>
                  <td className="border-b px-4 py-2">{quote.finalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};