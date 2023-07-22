import { useState } from 'react';
import Navbar from '../components/Navbar';



export default function Home() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fuelQuotes, setFuelQuotes] = useState<{date: string, gallons: number, clientLocation: string, fuelRate: number, finalPrice: number}[]>([]);

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
    <div className="flex flex-col py-20">
        <Navbar />
        <div className="flex flex-col items-center justify-start pt-4 min-h-screen ">
            <div className="mt-4 border-gray-200 border rounded bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Fuel Quote History</h1>
        <div className="space-y-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date:</label>
            <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded shadow-sm focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date:</label>
            <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded shadow-sm focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded mb-6 mt-2" onClick={generateSampleFuelQuotes}>
            Retrieve Quote History
          </button>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"># of Gallons</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fuelQuotes.length > 0 ? fuelQuotes.map((quote, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">{quote.date}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quote.gallons}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quote.clientLocation}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quote.fuelRate}</td>
                <td className="px-6 py-4 whitespace-nowrap">{quote.finalPrice}</td>
              </tr>
            )) : (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap" colSpan={5}>No quotes found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

