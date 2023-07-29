import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalSignup, setShowModalSignup] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const router = useRouter();

  const { data: session } = useSession();

  const onSubmit = async (data) => {
    console.log(data);

    const result = await signIn('credentials', { 
        redirect: false, 
        email: data.email, 
        password: data.password 
    });

if (result && result.error) {
  console.log('Error:', result.error);
} else if (result && !result.error) {
  console.log('Sign in successful');
  setShowModal(false);  // This line closes the modal after a successful login
}
}

const onSubmitSignup = async (data) => {
  console.log(data);

  const response = await fetch('api/registration', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  });

  if (response.ok) {
      const responseData = await response.json();
      console.log(responseData);

      // Authenticate the user after successful registration
      const result = await signIn('credentials', { 
          redirect: false, 
          email: data.email, 
          password: data.password 
      });

      if (!result?.error) {
          console.log('Sign in successful');
          // Here you can do a redirection or show a success message
          setTimeout(() => setShowModalSignup(false), 2000);
      } else {
          console.log(result?.error);
          // Here you can show an error message
      }
  } else {
      const errorData = await response.json();
      console.log(errorData);
  }
}


  return (
    <div className="fixed top-0 left-0 right-0 z-1">
      <div className="container mx-auto pt-3 bg-gradient-to-b from-white to-white/0 bg-opacity-100"> 
        <div className="flex justify-center items-center">
          <nav className="flex justify-between items-center w-full">
            <div>
              <Link href="/">
                <div className="text-xl text-green-700 flex items-center">
                  <Image src="/FPI_Logo.png" alt="Logo" width={50} height={50} />
                  <div className="ml-5 flex flex-nowrap">
                    <p className="mr-1">A Fuel</p>
                    <p className="font-bold mr-1">Provider</p>
                  </div>
                </div>
              </Link>
            </div>
            <div className="flex space-x-4">
              <Link className={`text-md rounded-lg px-4 py-2 ${router.pathname === "/homepage" ? "text-black" : "text-slate-500 hover:text-black"}`} href="/">Homepage</Link>
              <Link className={`text-md rounded-lg px-4 py-2 ${router.pathname === "/fuelform" ? "text-black" : "text-slate-500 hover:text-black"}`} href="/fuelform">Fuel Form</Link>
              <Link className={`text-md rounded-lg px-4 py-2 ${router.pathname === "/quotehistory" ? "text-black" : "text-slate-500 hover:text-black"}`} href="/quotehistory">Quote History</Link>
            </div>
              <div className="flex space-x-4 items-center">
              {session ? (
                <p>Authenticated</p>
              ) : (
                <>
                  <div onClick={() => setShowModal(true)} className="ring-2 ring-blue-600 bg-white hover:blue-600 hover:text-white text-blue-600 text-md flex items-center rounded-md px-4 py-1  hover:bg-blue-700 ">
                    <span className="mx-auto cursor-pointer">Log In</span>
                  </div>
                  <div onClick={() => setShowModalSignup(true)} className="ring-2 ring-green-700 hover:ring-green-800 text-md flex items-center rounded-md hover:shadow-none px-4 py-1 bg-green-700 hover:bg-green-800 text-white">
                    <span className="mx-auto cursor-pointer">Sign Up</span>
                  </div>
                </>
              )}
              </div>

          </nav>
        </div>
      </div>
      
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 bg-black z-20 bg-[rgba(20,20,20,0.5)] backdrop-filter backdrop-blur">
          <div className=" inset-0 flex items-center justify-center">
            
          <div className="p-6 rounded-lg shadow-md flex flex-col relative bg-white">

            <div className="flex items-center ">
              <Image src="/FPI_Logo.png" alt="Logo" width="50" height="50" className="mr-2 mb-4" />
              <span className="text-md text-bold">
                Log Into Your Account
              </span>
            </div>
              
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.414 10L15.707 5.707a1 1 0 10-1.414-1.414L10 8.586 5.707 4.293a1 1 0 10-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              <form onSubmit={handleSubmit(onSubmit)} className="flex-grow">
                <div className="mb-4">
                  <label className="text-black mb-1">Email Address:</label>
                  <div className="flex">
                    <input
                    type="email"
                      {...register('email', { required: true, maxLength: 50 })}
                    className="border border-gray-400 rounded px-3 py-2 text-black focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {errors.email && <p className="text-red-600 text-sm">This field is required</p>}
                </div>
                <div className="mb-4">
                  <label className="text-black mb-1">Password:</label>
                  <div className="flex">
                    <input
                      type="password"
                      {...register('password', { required: true })}
                      className="border border-gray-400 rounded px-3 py-2 text-black focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  {errors.password && <p className="text-red-600 text-sm">This field is required</p>}
                </div>

                <div className="flex justify-end space-x-4 mt-5">
                  <button className="text-md rounded px-1 py-1 ring-1 ring-gray-400 bg-white hover:bg-gray-400 hover:text-white text-gray-400 w-full" onClick={() => setShowModal(false)}>Cancel</button>  
                  <button className="text-md rounded px-1 py-1 ring-1 ring-blue-600 bg-blue-600 hover:bg-blue-700 text-white w-full" type="submit" >Log In</button>
                </div>

              </form>
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
                onClick={() => setShowModal(false)}
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M11.414 10L15.707 5.707a1 1 0 10-1.414-1.414L10 8.586 5.707 4.293a1 1 0 10-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

{showModalSignup && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-80 bg-black z-20 bg-[rgba(20,20,20,0.5)] backdrop-filter backdrop-blur">
    <div className="bg-white p-6 rounded-lg shadow-md flex flex-col relative">
      <button
        className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        onClick={() => setShowModalSignup(false)}
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M11.414 10L15.707 5.707a1 1 0 10-1.414-1.414L10 8.586 5.707 4.293a1 1 0 10-1.414 1.414L8.586 10l-4.293 4.293a1 1 0 001.414 1.414L10 11.414l4.293 4.293a1 1 0 001.414-1.414L11.414 10z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      <div className="flex items-center ">
          <Image src="/FPI_Logo.png" alt="Logo" width="50" height="50" className="mr-2 mb-4" />
          <span className="text-md text-bold">
            Register An Account
          </span>
                
        </div>
              
          <form onSubmit={handleSubmit(onSubmitSignup)}>
            <div className="mb-4">
              <label htmlFor="email" className="text-black mb-1 flex justify-start">Email Address:</label>
              <input
              //i think its not submutting because of the the type, check later, check with login.tsx because it works
                type="text"
                id="email"
                {...register('email', { required: true, maxLength: 50 })}
                className="border border-gray-400 rounded px-3 py-2 text-black focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && <p className="text-red-600 text-sm">This field is required</p>}
            </div>

            <div className="mb-4">
              <label className="text-black mb-1">Password:</label>
              <div className="flex">
                <input
                  type="password"
                  {...register('password', { required: true })}
                  className="border border-gray-400 rounded px-3 py-2 text-black focus:ring-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              {errors.password && <p className="text-red-600 text-sm">This field is required</p>}
            </div>

        

            <div className="flex justify-end space-x-4 mt-5">
              <button className="text-md rounded px-1 py-1 ring-1 ring-gray-400 bg-white hover:bg-gray-400 hover:text-white text-gray-400 w-full" onClick={() => setShowModalSignup(false)}>Cancel</button>  
              <button className="text-md rounded px-1 py-1 ring-1 ring-blue-600 bg-blue-600 hover:bg-blue-700 text-white w-full" type="submit">Register</button>
            </div>

          </form>
        </div>
      </div>
      )}
        
    </div>
  );
};

export default Navbar;
