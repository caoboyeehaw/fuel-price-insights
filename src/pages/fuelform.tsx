import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import NavbarAuth from '../components/NavbarAuth';
import { useState } from 'react';



const Fuel_quote = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    // submit form data
  };
  const [form, setForm] = useState({
    gallonsRequested: '',
    deliveryState: '', 
    rateHistory: false,
    suggestedPrice: 0,
    totalAmountDue: 0
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
          <h1 className="text-2xl font-semibold mb-4 text-center ">
            Fuel Quote Form
          </h1>      
          <form onSubmit={handleSubmit(onSubmit)}>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 ">
                Gallons Requested:
              </label>
              <input 
                  className="border border-gray-300 p-2 w-full rounded focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
                {...register('GallonNeeded', { required: true })} 
              />
              {errors.GallonNeeded && <p className="text-red-500 text-sm">This field is required</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Delivery Address:
              </label>
              <input 
                className="border border-gray-300 p-2 w-full rounded focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="text" 
                {...register('deliveryAddress', {required: true})}
              />
              {errors.deliveryAddress && <p className="text-red-500 text-sm">This field is required</p>}
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">
                Delivery Date:
              </label>
              <input 
                className="border border-gray-300 p-2 w-full rounded focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="date"
                {...register('deliveryDate', {required: true})} 
              />
              {errors.deliveryDate && <p className="text-red-500 text-sm">This field is required</p>}
            </div>

            <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2 ">
                Suggested Price / Gallon:
              </label>
              <input 
                className="border border-gray-300 p-2 w-full rounded focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                type="number" 
                {...register('ppg')} 
                readOnly 
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2 ">
                Total Amount Due:
              </label>
              <input 
                className="border border-gray-300 p-2 w-full rounded focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 "
                type="number" 
                {...register('totalAmountDue')} 
                readOnly 
              />
            </div>

            <div>
              <button
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-4"
                onClick={handleGetQuote}  
              >
                Get Quote
              </button>
            </div>

            <div>
              <button
                className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full mt-5"
                type="submit"
                >
                Submit
              </button>
            </div>





          </form>

        </div>

      </div>
    </div>

  );
}

export default Fuel_quote;
