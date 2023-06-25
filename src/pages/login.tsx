import { useForm } from 'react-hook-form';
import Navbar from '../components/Navbar';

const SigninPage = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  }

  return (
    <div className="flex flex-col min-h-screen py-6">
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-opacity-50 bg-gray-900">
        <div className="bg-white p-8 rounded-lg shadow-md flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Email:</label>
              <input {...register('email', { required: true })} />
              {errors.email && <p>This field is required</p>}
            </div>
            <div>
              <label>Password:</label>
              <input type="password" {...register('password', { required: true })} />
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
