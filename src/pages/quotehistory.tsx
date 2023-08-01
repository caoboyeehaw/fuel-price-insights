import { useState } from 'react';
import Navbar from '../components/Navbar';
import NavbarAuth from '../components/NavbarAuth';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';

export default function Home() {
  const { status } = useSession();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [fuelQuotes, setFuelQuotes] = useState<{deliveryDate: string, gallonsRequested: number, deliveryAddress: string, suggestedPrice: number, totalAmountDue: number, userid: string}[]>([]);


  const loading = status === "loading";

  const handleStartDateChange = (event) => {
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setEndDate(event.target.value);
  };

  // Function to generate sample fuel price quotes
  const generateSampleFuelQuotes = async () => {
    try {
      const res = await fetch(`/api/getFuelQuotes?startDate=${startDate}&endDate=${endDate}`);
      const { data } = await res.json();
  
      console.log(data);  // Log the data to the console
  
      setFuelQuotes(data);
    } catch (err) {
      console.error(err);
    }
    
  };
  useEffect(() => {
    console.log(fuelQuotes);
  }, [fuelQuotes]);


  return (
    <div className="flex flex-col py-20">
        <Navbar />
        <div className="flex flex-col items-center justify-start pt-4 min-h-screen ">
            <div className="mt-4 border-gray-200 border rounded bg-white p-6 shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-center">Fuel Quote History</h1>
        <div className="space-y-4">
        <div className="space-y-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Delivery Date:</label>
            <input type="date" id="start-date" value={startDate} onChange={handleStartDateChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded shadow-sm focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Delivery Date:</label>
            <input type="date" id="end-date" value={endDate} onChange={handleEndDateChange} className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded shadow-sm focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm" />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-8 rounded mb-6 mt-2" onClick={generateSampleFuelQuotes}>
            Retrieve Quote History
          </button>
        </div>
        </div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"># of Gallons</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Location</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fuel Rate</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Final Price</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {fuelQuotes && fuelQuotes.length > 0 ? fuelQuotes.map((quote, index) => {
              const date = new Date(quote.deliveryDate).toLocaleDateString();
                return (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap">{quote.userid}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quote.gallonsRequested}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quote.deliveryAddress}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quote.suggestedPrice}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{quote.totalAmountDue}</td>
                  </tr>
                );
            }) : (
              <tr>
                <td className="px-6 py-4 whitespace-nowrap" colSpan={6}>No quotes found.</td>
              </tr>
            )}
        </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};

