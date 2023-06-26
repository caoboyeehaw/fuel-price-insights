import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';

const SigninPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showModal, setShowModal] = useState(false);

  const onSubmit = (data) => {
    console.log(data);
  }

  const openModal = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="flex flex-col min-h-screen py-6">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-opacity-50 bg-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="text-black mb-1">Email:</label>
              <div className="flex">
                <input
                  {...register('email', { required: true })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-black"
                />
              </div>
              {errors.email && <p>This field is required</p>}
            </div>
            <div className="mb-4">
              <label className="text-black mb-1">Password:</label>
              <div className="flex">
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-black"
                />
              </div>
              {errors.password && <p>This field is required</p>}
            </div>
            <div className="flex justify-end">
              <button className="text-md flex items-center rounded-md px-4 py-1 bg-gray-900 hover:bg-gray-800 text-white" type="submit">Login</button>
            </div>
          </form>
          <div className="text-black mt-4 text-center">
            Not a client?{' '}
            <button className="text-blue-500" onClick={openModal}>Sign up here!</button>
          </div>
        </div>
      </div>
      {showModal && (
  <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-opacity-50 bg-gray-900">
    <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Registration</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label htmlFor="fullName" className="text-black mb-1 flex justify-start">Full Name:</label>
          <input
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
      <button className="mt-4 text-md flex items-center rounded-md px-4 py-1 bg-gray-900 hover:bg-gray-800 text-white" onClick={closeModal}>Close</button>
    </div>
  </div>
)}
    </div>
  );
};

export default SigninPage;
