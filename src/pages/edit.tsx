import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';
import { getDatabase } from './api/db';

const RegistrationPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [isFormFilled, setIsFormFilled] = useState(false);

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    address1: '',
    address2: '', // Added address2 to the form state
    city: '',
    state: '',
    zip: '', // Changed zip to be a string to allow non-numeric characters
  });

  useEffect(() => {
    const isAllFieldsFilled = (
      form.fullName.trim() !== '' ||
      form.email.trim() !== '' ||
      form.address1.trim() !== '' ||
      form.city.trim() !== '' ||
      form.state.trim() !== '' ||
      form.zip.trim() !== ''
    );
    setIsFormFilled(isAllFieldsFilled);
  }, [form]);

  const onSubmitProfile = async (data) => {
    console.log(data);

    // Assuming you have the correct API endpoint for profile update
    const response = await fetch('api/editProf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      // Reset the form fields after successful submission
      setForm({
        fullName: '',
        email: '',
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
      });
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  };

  const onSubmitPasswordChange = async (data) => {
    console.log(data);

    // Assuming you have the correct API endpoint for password change
    const response = await fetch('api/change-password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);
      // Reset the password fields after successful submission
      setForm({
        ...form,
        password: '',
        newPassword: '',
      });
    } else {
      const errorData = await response.json();
      console.log(errorData);
    }
  };

  return (
    <div className="flex flex-col min-h-screen py-6">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen ">
        <div className="container flex justify-center">
          <div className="bg-white p-14 rounded-lg shadow-md flex flex-col mr-6">
            {/* Display current information from the form state */}
            <h2 className="text-2xl font-bold mb-4">Current Information</h2>
            <p className="mb-2"><strong>Name:</strong> {form.fullName}</p>
            <p className="mb-2"><strong>Email:</strong> {form.email}</p>
            <p className="mb-2"><strong>Address 1:</strong> {form.address1}</p>
            <p className="mb-2"><strong>Address 2:</strong> {form.address2}</p>
            <p className="mb-2"><strong>City:</strong> {form.city}</p>
            <p className="mb-2"><strong>State:</strong> {form.state}</p>
            <p className="mb-2"><strong>Zipcode:</strong> {form.zip}</p>
          </div>
          <div className="bg-white p-14 rounded-lg shadow-md flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
            <h3>Enter all details again and press Save Changes</h3>
            <form onSubmit={handleSubmit(onSubmitProfile)}>
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
          {errors.address2 && <p>This field is required</p>}
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
                  <option value="AL">Alabama (AL)</option>
                  <option value="AK">Alaska (AK)</option>
                  <option value="AZ">Arizona (AZ)</option>
                  <option value="AR">Arkansas (AR)</option>
                  <option value="CA">California (CA)</option>
                  <option value="CO">Colorado (CO)</option>
                  <option value="CT">Connecticut (CT)</option>
                  <option value="DE">Delaware (DE)</option>
                  <option value="FL">Florida (FL)</option>
                  <option value="GA">Georgia (GA)</option>
                  <option value="HI">Hawaii (HI)</option>
                  <option value="ID">Idaho (ID)</option>
                  <option value="IL">Illinois (IL)</option>
                  <option value="IN">Indiana (IN)</option>
                  <option value="IA">Iowa (IA)</option>
                  <option value="KS">Kansas (KS)</option>
                  <option value="KY">Kentucky (KY)</option>
                  <option value="LA">Louisiana (LA)</option>
                  <option value="ME">Maine (ME)</option>
                  <option value="MD">Maryland (MD)</option>
                  <option value="MA">Massachusetts (MA)</option>
                  <option value="MI">Michigan (MI)</option>
                  <option value="MN">Minnesota (MN)</option>
                  <option value="MS">Mississippi (MS)</option>
                  <option value="MO">Missouri (MO)</option>
                  <option value="MT">Montana (MT)</option>
                  <option value="NE">Nebraska (NE)</option>
                  <option value="NV">Nevada (NV)</option>
                  <option value="NH">New Hampshire (NH)</option>
                  <option value="NJ">New Jersey (NJ)</option>
                  <option value="NM">New Mexico (NM)</option>
                  <option value="NY">New York (NY)</option>
                  <option value="NC">North Carolina (NC)</option>
                  <option value="ND">North Dakota (ND)</option>
                  <option value="OH">Ohio (OH)</option>
                  <option value="OK">Oklahoma (OK)</option>
                  <option value="OR">Oregon (OR)</option>
                  <option value="PA">Pennsylvania (PA)</option>
                  <option value="RI">Rhode Island (RI)</option>
                  <option value="SC">South Carolina (SC)</option>
                  <option value="SD">South Dakota (SD)</option>
                  <option value="TN">Tennessee (TN)</option>
                  <option value="TX">Texas (TX)</option>
                  <option value="UT">Utah (UT)</option>
                  <option value="VT">Vermont (VT)</option>
                  <option value="VA">Virginia (VA)</option>
                  <option value="WA">Washington (WA)</option>
                  <option value="WV">West Virginia (WV)</option>
                  <option value="WI">Wisconsin (WI)</option>
                  <option value="WY">Wyoming (WY)</option>
                </select>
                {errors.state && <p>This field is required</p>}
              </div>
        <div className="mb-4">
          <label htmlFor="zip" className="text-black mb-1 flex justify-start">Zip Code:</label>
          <input
            type="text"
            id="zip"
            {...register('zip', { required: true, maxLength: 5 })}
            className="border border-gray-300 rounded-md px-8 py-2 text-black"
          />
          {errors.city && <p>This field is required</p>}
        </div>
        <button
                className="text-md flex items-center rounded-md px-4 py-1 bg-gray-900 hover:bg-gray-800 text-white"
                type="submit"
                disabled={!isFormFilled}
              >
                Save Changes
              </button>
            </form>

            <form onSubmit={handleSubmit(onSubmitPasswordChange)}>
            <div className="mb-4">
              <label className="text-black mb-1">Current Password:</label>
              <div className="flex">
                <input
                  type="password"
                  {...register('currentPassword', { required: true })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-black"
                />
              </div>
              {errors.currentPassword && <p>This field is required</p>}
            </div>
            <div className="mb-4">
              <label className="text-black mb-1">New Password:</label>
              <div className="flex">
                <input
                  type="password"
                  {...register('newPassword', { required: true })}
                  className="border border-gray-300 rounded-md px-3 py-2 text-black"
                />
              </div>
              {errors.newPassword && <p>This field is required</p>}
            </div>
            <button
                className="text-md flex items-center rounded-md px-4 py-1 bg-gray-900 hover:bg-gray-800 text-white"
                type="submit"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationPage;
