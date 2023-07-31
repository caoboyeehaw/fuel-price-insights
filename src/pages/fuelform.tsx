import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';  // useEffect moved here
import { Session } from 'next-auth';
import { useSession as useNextAuthSession } from 'next-auth/react';
import Navbar from '../components/Navbar';
import NavbarAuth from '../components/NavbarAuth';

interface CustomSession extends Session {
  userId: string;
}

const Fuel_quote = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { data: session, status } = useNextAuthSession();
  const [isFormValid, setIsFormValid] = useState(false);
  const [isQuoteButtonPressed, setIsQuoteButtonPressed] = useState(false);
  
  const [form, setForm] = useState({
    userid:'null',
    gallonsRequested: '',
    deliveryState: '', //set this to equal current user state info
    rateHistory: false,
    suggestedPrice: 0,
    totalAmountDue: 0,
    deliveryAddress: '',
    deliveryDate: ''
  });

  const [quote, setQuote] = useState({
    suggestedPrice: 0,
    totalAmountDue: 0
  });

  if (status === 'loading') {
    return null;
  }

  const userId = session?.user;

  const onSubmit = async (data) => {
    const completeData = { ...data, userId, ...quote };
    
    try {
        const response = await fetch('/api/submitFuelQuote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(completeData),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const responseJson = await response.json();

        // handle success
        console.log("Success:", responseJson);
        alert("Form submitted successfully!");
    } catch (error) {
        // handle error
        console.error("Error:", error);
        alert("An error occurred while submitting the form.");
    }
};
    
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm(prevForm => ({
      ...prevForm,
      [name]: value
    }));
  }
  
  useEffect(() => {
    setIsFormValid(
      form.gallonsRequested.trim() !== '' &&
      form.deliveryAddress.trim() !== '' &&
      form.deliveryDate.trim() !== ''
    );
  }, [form]);


  const handleGetQuote = (event) => {
    event.preventDefault();

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
    setIsQuoteButtonPressed(true);
  }



  return (
    <div className="flex flex-col min-h-screen py-20">
      {session?.user ? <NavbarAuth /> : <Navbar />}
      <div className="flex flex-col items-center justify-start p-4">
        <div className="w-full max-w-lg mt-4 border border-gray-200 rounded-md bg-white p-6 shadow-lg">
          <h1 className="text-2xl font-semibold mb-4 text-center ">
            Fuel Quote Form
          </h1>
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
                Gallons Requested:
            </label>
            <input
                name="gallonsRequested"
                className="border border-gray-300 p-2 w-full rounded focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="text"
                value={form.gallonsRequested}
                onChange={handleInputChange}
                required
            />
        </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Delivery Address:
              </label>
              <input
                className="border border-gray-300 p-2 w-full rounded focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="text"
                {...register('deliveryAddress', { required: true })}
                onChange={handleInputChange}
              />
              {errors.deliveryAddress && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>

            <div className="mb-2">
              <label className="block text-gray-700 font-medium mb-2">
                Delivery Date:
              </label>
              <input
                className="border border-gray-300 p-2 w-full rounded focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="date"
                {...register('deliveryDate', { required: true })}
                onChange={handleInputChange}
              />
              {errors.deliveryDate && (
                <p className="text-red-500 text-sm">This field is required</p>
              )}
            </div>

            <div>

            <button
              className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4 
                ${isFormValid ? "bg-blue-600 hover:bg-blue-700 text-white" : "bg-blue-200 text-blue-600 cursor-not-allowed"}`}
              onClick={handleGetQuote}
              disabled={!isFormValid}
            >
              Get Quote
            </button>

            </div>

            <div className="mb-4 mt-8">
              <label className="block text-gray-700 font-medium mb-2 ">
                Suggested Price / Gallon:
              </label>
              <span id="suggestedPriceDisplay" className="text-2xl">
                ${quote.suggestedPrice.toFixed(2)}
              </span>
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 ">
                Total Amount Due:
              </label>
              <span id="totalAmountDueDisplay" className="text-2xl">
                ${quote.totalAmountDue.toFixed(2)}
              </span>
            </div>

            <div>
            <button
              className={`py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-5 
                ${isQuoteButtonPressed && isFormValid ? "bg-green-700 hover:bg-green-800 text-white" : "bg-green-200 text-green-600 cursor-not-allowed"}`}
              type="submit"
              disabled={!isQuoteButtonPressed || !isFormValid}
            >
              Submit
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Fuel_quote;