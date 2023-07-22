import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';

export default function Calculator() {

  const [form, setForm] = useState({
    gallonsRequested: '',
    deliveryState: '', 
    rateHistory: false,
  });

  const [quote, setQuote] = useState({
    suggestedPrice: 0,
    totalAmountDue: 0
  });

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: value
    });
  }

  const handleGetQuote = () => {

    const currentPrice = 1.50;
    let margin = currentPrice;

    const locationFactor = form.deliveryState === 'Texas' ? 0.02 : 0.04;
    const rateHistoryFactor = form.rateHistory ? 0.01 : 0;
    
    const gallonsRequested = parseInt(form.gallonsRequested); 
    const gallonsRequestedFactor = gallonsRequested > 1000 ? 0.02 : 0.03;

    const companyProfitFactor = 0.1;
    margin *= (locationFactor - rateHistoryFactor + gallonsRequestedFactor + companyProfitFactor);

    const suggestedPrice = currentPrice + margin;
    const totalAmountDue = suggestedPrice * gallonsRequested;

    // Update quote state
    setQuote({
      suggestedPrice: suggestedPrice,
      totalAmountDue: totalAmountDue
    });
  }

  return (
    <div className="flex flex-col min-h-screen py-20">
      <Navbar />
      <div className="flex flex-col items-center justify-start p-4">
        <div className="w-full max-w-lg mt-4 border border-gray-200 rounded-md bg-white p-6 shadow-lg">
          <h1 className="text-2xl font-bold mb-4 text-center">
            Fuel Quote Calculator
          </h1>

          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Gallons Requested:
              </label>
              
              <input 
                className="border border-gray-300 p-2 w-full rounded focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                name="gallonsRequested"
                value={form.gallonsRequested}
                onChange={handleInputChange}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleGetQuote}  
              >
                Get Quote
              </button>

              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Submit Quote
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );

}

