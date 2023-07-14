import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';

const RegistrationPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);

    const response = await fetch('api/registration',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData)
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  }

  // const openModal = () => {
  //   setShowModal(true);
  // }

  // const closeModal = () => {
  //   setShowModal(false);
  // }

  return (
    <div className="flex flex-col min-h-screen py-6">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-opacity-50 bg-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Registration</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="fullName" className="text-black mb-1 flex justify-start">Full Name:</label>
              <input
              //i think its not submutting because of the the type, check later, check with login.tsx because it works
                type="text"
                id="fullName"
                {...register('fullName', { required: true, maxLength: 50 })}
                className="border border-gray-300 rounded-md px-3 py-2 text-black"
              />
              {errors.fullName && <p>This field is required</p>}
            </div>
            <div className="mb-4">
          <label htmlFor="address1" className="text-black mb-1 flex justify-start">Address 1:</label>
          <input
            type="text"
            id="address1"
            {...register('address1', { required: true, maxLength: 100 })}
            className="border border-gray-300 rounded-md px-3 py-2 text-black"
          />
          {errors.address1 && <p>This field is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="address2" className="text-black mb-1 flex justify-start">Address 2:</label>
          <input
            type="text"
            id="address2"
            {...register('address2', { maxLength: 100 })}
            className="border border-gray-300 rounded-md px-3 py-2 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="text-black mb-1 flex justify-start">City:</label>
          <input
            type="text"
            id="city"
            {...register('city', { required: true, maxLength: 100 })}
            className="border border-gray-300 rounded-md px-3 py-2 text-black"
          />
          {errors.city && <p>This field is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="text-black mb-1 flex justify-start">State:</label>
          <select
            id="state"
            {...register('state', { required: true })}
            className="border border-gray-300 rounded-md px-3 py-2 text-black"
          >
            <option value="">Select State</option>
            <option value="AL">AL</option>
            <option value="AK">AK</option>
          </select>
          {errors.state && <p>This field is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="zipcode" className="text-black mb-1 flex justify-start">Zipcode:</label>
          <input
            type="text"
            id="zipcode"
            {...register('zipcode', { required: true, minLength: 5, maxLength: 9 })}
            className="border border-gray-300 rounded-md px-3 py-2 text-black"
          />
          {errors.zipcode && <p>At least 5 characters required</p>}
        </div>
            <button className="text-md flex items-center rounded-md px-4 py-1 bg-gray-900 hover:bg-gray-800 text-white" type="submit">Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;