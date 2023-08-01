import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { getDatabase } from './api/db'

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

  return (
    <div className="flex flex-col min-h-screen py-6">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen ">
        <div className="container flex justify-center">
        <div className="bg-white p-14 rounded-lg shadow-md flex flex-col mr-6">
          <h2 className="text-2xl font-bold mb-4">Current Information</h2>
          <p className="mb-2"><strong>Name:</strong> </p>
          <p className="mb-2"><strong>Email:</strong> </p>
          <p className="mb-2"><strong>Address 1:</strong> </p>
          <p className="mb-2"><strong>Address 2:</strong> </p>
          <p className="mb-2"><strong>City:</strong> </p>
          <p className="mb-2"><strong>State:</strong> </p>
          <p className="mb-2"><strong>Zipcode:</strong> </p>
        </div>
      <div className="bg-white p-14 rounded-lg shadow-md flex flex-col">
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="fullName" className="text-black mb-1 flex justify-start">Full Name:</label>
              <input
              //i think its not submutting because of the the type, check later, check with login.tsx because it works
                type="text"
                id="fullName"
                {...register('fullName', { required: true, maxLength: 50 })}
                className="border border-gray-300 rounded-md px-8 py-2 text-black"
              />
              {errors.fullName && <p>This field is required</p>}
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="text-black mb-1 flex justify-start">Email:</label>
              <input
              //i think its not submutting because of the the type, check later, check with login.tsx because it works
                type="text"
                id="email"
                {...register('email', { required: true, maxLength: 50 })}
                className="border border-gray-300 rounded-md px-8 py-2 text-black"
              />
              {errors.email && <p>This field is required</p>}
            </div>
            <div className="mb-4">
          <label htmlFor="address1" className="text-black mb-1 flex justify-start">Address 1:</label>
          <input
            type="text"
            id="address1"
            {...register('address1', { required: true, maxLength: 100 })}
            className="border border-gray-300 rounded-md px-8 py-2 text-black"
          />
          {errors.address1 && <p>This field is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="address2" className="text-black mb-1 flex justify-start">Address 2:</label>
          <input
            type="text"
            id="address2"
            {...register('address2', { maxLength: 100 })}
            className="border border-gray-300 rounded-md px-8 py-2 text-black"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="text-black mb-1 flex justify-start">City:</label>
          <input
            type="text"
            id="city"
            {...register('city', { required: true, maxLength: 100 })}
            className="border border-gray-300 rounded-md px-8 py-2 text-black"
          />
          {errors.city && <p>This field is required</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="state" className="text-black mb-1 flex justify-start">State:</label>
          <select
            id="state"
            {...register('state', { required: true })}
            className="border border-gray-300 rounded-md px-6 py-2 text-black"
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
            className="border border-gray-300 rounded-md px-8 py-2 text-black"
          />
          {errors.zipcode && <p>At least 5 characters required</p>}
        </div>
            <button className="text-md flex items-center rounded-md px-4 py-1 bg-gray-900 hover:bg-gray-800 text-white" type="submit">Save Changes</button>
          </form>
          
          <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4">
              <label className="text-black mb-1">Current Password:</label>
              <div className="flex">
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-black"
                />
              </div>
              {errors.password && <p>This field is required</p>}
            </div>
            <div className="mb-4">
              <label className="text-black mb-1">New Password:</label>
              <div className="flex">
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-black"
                />
              </div>
              {errors.password && <p>This field is required</p>}
            </div>
            <button className="text-md flex items-center rounded-md px-4 py-1 bg-gray-900 hover:bg-gray-800 text-white" type="submit">Change Password</button>
          </form>
        </div>
    </div>
    </div>
    </div>
  );
};

export default RegistrationPage;
