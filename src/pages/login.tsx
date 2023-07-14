import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';

const SigninPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const [showModal, setShowModal] = useState(false);

  const onSubmit = async (data) => {
    console.log(data);

    const response = await fetch('api/loginback',{
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
        </div>
      </div>
    </div>
  );
};

export default SigninPage;
